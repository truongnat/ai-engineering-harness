#!/bin/sh
set -eu

REPO="truongnat/ai-engineering-harness"
REF="main"

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
cleanup() {
  rm -f "$TMP_SCRIPT"
}
trap cleanup EXIT INT TERM

curl -fsSL "https://raw.githubusercontent.com/${REPO}/${REF}/aih.sh" -o "$TMP_SCRIPT"
exec sh "$TMP_SCRIPT" "$@"
