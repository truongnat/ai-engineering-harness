#!/bin/sh
set -eu

REPO="truongnat/ai-engineering-harness"
REF="v1.0.1"

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" 2>/dev/null && pwd || true)
if [ -n "${SCRIPT_DIR:-}" ] && [ -f "$SCRIPT_DIR/aih.sh" ]; then
  exec sh "$SCRIPT_DIR/aih.sh" "$@"
fi

_expect_ref=0
for _arg in "$@"; do
  if [ "$_expect_ref" -eq 1 ]; then
    REF="$_arg"
    _expect_ref=0
    continue
  fi
  case "$_arg" in
    --ref)
      _expect_ref=1
      ;;
    --ref=*)
      REF=${_arg#--ref=}
      ;;
  esac
done

command -v curl >/dev/null 2>&1 || {
  printf '%s\n' 'ai-engineering-harness installer: error: curl is required to bootstrap aih.sh remotely.' >&2
  exit 1
}

TMP_SCRIPT=$(mktemp "${TMPDIR:-/tmp}/aih-bootstrap.XXXXXX")
TMP_SUM=$(mktemp "${TMPDIR:-/tmp}/aih-bootstrap-sha.XXXXXX")
cleanup() {
  rm -f "$TMP_SCRIPT"
  rm -f "$TMP_SUM"
}
trap cleanup EXIT INT TERM

curl -fsSL "https://raw.githubusercontent.com/${REPO}/${REF}/aih.sh" -o "$TMP_SCRIPT"
curl -fsSL "https://raw.githubusercontent.com/${REPO}/${REF}/aih.sh.sha256" -o "$TMP_SUM"

verify_sha256() {
  _expected=$(awk '{ print $1 }' "$TMP_SUM")
  [ -n "$_expected" ] || {
    printf '%s\n' 'ai-engineering-harness installer: error: checksum file is empty.' >&2
    exit 1
  }

  if command -v sha256sum >/dev/null 2>&1; then
    _actual=$(sha256sum "$TMP_SCRIPT" | awk '{ print $1 }')
  elif command -v shasum >/dev/null 2>&1; then
    _actual=$(shasum -a 256 "$TMP_SCRIPT" | awk '{ print $1 }')
  elif command -v openssl >/dev/null 2>&1; then
    _actual=$(openssl dgst -sha256 "$TMP_SCRIPT" | awk '{ print $NF }')
  else
    printf '%s\n' 'ai-engineering-harness installer: error: no SHA-256 tool found (need sha256sum, shasum, or openssl).' >&2
    exit 1
  fi

  if [ "$_actual" != "$_expected" ]; then
    printf '%s\n' 'ai-engineering-harness installer: error: checksum verification failed for aih.sh.' >&2
    exit 1
  fi
}

verify_sha256
exec sh "$TMP_SCRIPT" "$@"
