#!/bin/sh
# ai-engineering-harness remote installer — runtime/scope selection + manual fallback
set -eu

REPO="truongnat/ai-engineering-harness"
TARGET="."
REF="main"
DRY_RUN=0
FORCE=0
RUNTIME=""
SCOPE=""
INIT_HARNESS=0
YES=0

usage() {
  cat <<'EOF'
ai-engineering-harness installer

Usage:
  install.sh [options]

Options:
  --target <path>       Target repository (default: current directory)
  --runtime <name>      claude | codex | cursor | gemini | opencode | generic | all | manual
  --scope <name>        global | project (required for non-manual non-interactive)
  --init-harness        Request project .harness/ scaffold (planned; not implemented yet)
  --legacy-root         Alias for --runtime manual (root copy fallback)
  --dry-run             Show plan or manual copy preview without writing
  --force               Overwrite existing files (manual fallback only)
  --ref <git-ref>       GitHub ref to install (branch or tag, default: main)
  --yes                 Skip interactive confirmation
  --help                Show this help

Runtime-native install (claude, cursor, …) is planned; only manual fallback writes today.

Examples:
  install.sh --runtime manual --target . --dry-run
  install.sh --legacy-root --target ../my-project
  install.sh --runtime claude --scope project --dry-run --yes
  install.sh --ref v0.9.0 --runtime manual --target .

Remote one-line install (non-interactive; defaults to manual fallback with warning):
  curl -fsSL https://raw.githubusercontent.com/truongnat/ai-engineering-harness/main/install.sh | sh
  curl -fsSL .../install.sh | sh -s -- --target . --dry-run
EOF
}

fail() {
  printf 'ai-engineering-harness installer: error: %s\n' "$1" >&2
  exit 1
}

is_interactive() {
  [ -t 0 ] && [ -t 1 ]
}

validate_runtime() {
  case "$1" in
    claude|codex|cursor|gemini|opencode|generic|all|manual) return 0 ;;
    *) return 1 ;;
  esac
}

validate_scope() {
  case "$1" in
    global|project) return 0 ;;
    *) return 1 ;;
  esac
}

runtime_label() {
  case "$1" in
    claude) printf '%s' 'Claude Code' ;;
    codex) printf '%s' 'Codex CLI' ;;
    cursor) printf '%s' 'Cursor' ;;
    gemini) printf '%s' 'Gemini CLI' ;;
    opencode) printf '%s' 'OpenCode' ;;
    generic) printf '%s' 'Generic AGENTS.md bootstrap' ;;
    all) printf '%s' 'All supported runtimes' ;;
    manual) printf '%s' 'Manual fallback (root copy via install.js)' ;;
    *) printf '%s' "$1" ;;
  esac
}

pick_runtime_interactive() {
  printf '%s\n' '' 'AI Engineering Harness Installer' '' 'Choose agent runtime:'
  printf '%s\n' \
    '  1) Claude Code' \
    '  2) Codex CLI' \
    '  3) Cursor' \
    '  4) Gemini CLI' \
    '  5) OpenCode' \
    '  6) Generic AGENTS.md bootstrap' \
    '  7) All supported' \
    '  8) Manual fallback / root copy'
  while true; do
    printf '%s' 'Select runtime [1-8]: '
    read -r choice || fail 'could not read runtime selection'
    case "$choice" in
      1) RUNTIME=claude; break ;;
      2) RUNTIME=codex; break ;;
      3) RUNTIME=cursor; break ;;
      4) RUNTIME=gemini; break ;;
      5) RUNTIME=opencode; break ;;
      6) RUNTIME=generic; break ;;
      7) RUNTIME=all; break ;;
      8) RUNTIME=manual; break ;;
      *) printf '%s\n' '  Invalid choice. Enter 1-8.' ;;
    esac
  done
}

pick_scope_interactive() {
  printf '%s\n' '' 'Install scope:'
  printf '%s\n' \
    '  1) Global — runtime-level install; no .harness/ by default' \
    '  2) Project — repo-level install; may init .harness/'
  while true; do
    printf '%s' 'Select scope [1-2]: '
    read -r choice || fail 'could not read scope selection'
    case "$choice" in
      1) SCOPE=global; break ;;
      2) SCOPE=project; break ;;
      *) printf '%s\n' '  Invalid choice. Enter 1-2.' ;;
    esac
  done
}

print_install_plan() {
  printf '%s\n' '' '--- Install plan ---'
  printf '  runtime:       %s (%s)\n' "$RUNTIME" "$(runtime_label "$RUNTIME")"
  if [ "$RUNTIME" = manual ]; then
    printf '  scope:         (ignored for manual fallback)\n'
  else
    printf '  scope:         %s\n' "$SCOPE"
  fi
  printf '  target:        %s\n' "$TARGET_ABS"
  printf '  ref:           %s\n' "$REF"
  printf '  init-harness:  %s\n' "$([ "$INIT_HARNESS" -eq 1 ] && printf yes || printf no)"
  printf '  dry-run:       %s\n' "$([ "$DRY_RUN" -eq 1 ] && printf yes || printf no)"
  printf '  force:         %s\n' "$([ "$FORCE" -eq 1 ] && printf yes || printf no)"
  printf '%s\n' '' 'What will happen:'
  if [ "$RUNTIME" = manual ]; then
    printf '%s\n' \
      '  - Download pack archive from GitHub' \
      '  - Run install.js legacy root-copy fallback into target' \
      '  - This copies AGENTS.md, commands/, skills/, workflows/, patterns/, templates/, docs/, …' \
      '  - Root copy is fallback only, not the recommended final plugin UX'
    if [ "$INIT_HARNESS" -eq 1 ]; then
      printf '%s\n' '  - Note: --init-harness requested; .harness/ init is not implemented in this step'
    fi
  else
    printf '%s\n' \
      "  - Runtime-native install for '$RUNTIME' (scope: $SCOPE) is planned but NOT implemented yet" \
      '  - No pack files will be written to the product repo root in this step' \
      '  - Use --runtime manual for legacy root copy, or wait for runtime-specific install steps'
    if [ "$INIT_HARNESS" -eq 1 ]; then
      printf '%s\n' '  - Note: --init-harness will apply when project init is implemented (Step 5)'
    fi
  fi
  printf '%s\n' '---'
}

confirm_plan() {
  if [ "$YES" -eq 1 ]; then
    return 0
  fi
  if ! is_interactive; then
    return 0
  fi
  printf '%s' 'Proceed? [y/N]: '
  read -r ans || fail 'could not read confirmation'
  case "$ans" in
    y|Y|yes|Yes|YES) return 0 ;;
    *) printf '%s\n' 'Aborted.'; exit 0 ;;
  esac
}

run_manual_install() {
  ARCHIVE_URL="https://github.com/${REPO}/archive/${REF}.tar.gz"
  printf '%s\n' '' "Downloading pack for manual fallback: $ARCHIVE_URL"

  command -v node >/dev/null 2>&1 || fail "node is required but was not found on PATH"
  command -v tar >/dev/null 2>&1 || fail "tar is required but was not found on PATH"

  if command -v curl >/dev/null 2>&1; then
    DOWNLOAD="curl"
  elif command -v wget >/dev/null 2>&1; then
    DOWNLOAD="wget"
  else
    fail "curl or wget is required to download the pack archive"
  fi

  TMPDIR=$(mktemp -d 2>/dev/null || mktemp -d -t ai-harness-install)
  cleanup() {
    rm -rf "$TMPDIR"
  }
  trap cleanup EXIT INT HUP TERM

  ARCHIVE="${TMPDIR}/pack.tar.gz"

  if [ "$DOWNLOAD" = "curl" ]; then
    curl -fsSL "$ARCHIVE_URL" -o "$ARCHIVE" || fail "failed to download archive from $ARCHIVE_URL"
  else
    wget -q -O "$ARCHIVE" "$ARCHIVE_URL" || fail "failed to download archive from $ARCHIVE_URL"
  fi

  EXTRACT="${TMPDIR}/extract"
  mkdir -p "$EXTRACT"
  tar -xzf "$ARCHIVE" -C "$EXTRACT" || fail "failed to extract archive"

  PACK_ROOT=""
  for candidate in "$EXTRACT"/*; do
    if [ -f "${candidate}/install.js" ]; then
      PACK_ROOT=$candidate
      break
    fi
  done

  [ -n "$PACK_ROOT" ] || fail "could not find install.js in downloaded archive"

  set -- --target "$TARGET_ABS"
  if [ "$DRY_RUN" -eq 1 ]; then
    set -- "$@" --dry-run
  fi
  if [ "$FORCE" -eq 1 ]; then
    set -- "$@" --force
  fi

  (
    cd "$PACK_ROOT" || exit 1
    node install.js "$@"
  )
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target)
      [ "$#" -ge 2 ] || fail "missing value for --target"
      TARGET="$2"
      shift 2
      ;;
    --runtime)
      [ "$#" -ge 2 ] || fail "missing value for --runtime"
      RUNTIME="$2"
      shift 2
      ;;
    --scope)
      [ "$#" -ge 2 ] || fail "missing value for --scope"
      SCOPE="$2"
      shift 2
      ;;
    --init-harness)
      INIT_HARNESS=1
      shift
      ;;
    --legacy-root)
      RUNTIME="manual"
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --ref)
      [ "$#" -ge 2 ] || fail "missing value for --ref"
      REF="$2"
      shift 2
      ;;
    --yes)
      YES=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      fail "unknown option: $1 (try --help)"
      ;;
    *)
      fail "unexpected argument: $1 (try --help)"
      ;;
  esac
done

if [ -n "$RUNTIME" ] && ! validate_runtime "$RUNTIME"; then
  fail "invalid --runtime: $RUNTIME (try claude, codex, cursor, gemini, opencode, generic, all, manual)"
fi

if [ -n "$SCOPE" ] && ! validate_scope "$SCOPE"; then
  fail "invalid --scope: $SCOPE (try global or project)"
fi

if [ -z "$RUNTIME" ]; then
  if is_interactive; then
    pick_runtime_interactive
  else
    RUNTIME=manual
    printf '%s\n' \
      'ai-engineering-harness installer: warning: no --runtime; defaulting to manual (root copy) fallback.' \
      '  This is not the final runtime-native plugin UX. Pass --runtime explicitly when ready.' >&2
  fi
fi

if [ "$RUNTIME" != manual ]; then
  if [ -z "$SCOPE" ]; then
    if is_interactive; then
      pick_scope_interactive
    else
      fail "missing --scope for runtime '$RUNTIME' (required: global or project)"
    fi
  fi
fi

# Resolve target to absolute path before any install work
if [ -d "$TARGET" ]; then
  TARGET_ABS=$(cd "$TARGET" && pwd)
elif [ "$DRY_RUN" -eq 1 ] && [ ! -e "$TARGET" ]; then
  TARGET_PARENT=$(dirname "$TARGET")
  TARGET_NAME=$(basename "$TARGET")
  [ -d "$TARGET_PARENT" ] || fail "target parent directory does not exist: $TARGET_PARENT"
  TARGET_ABS=$(cd "$TARGET_PARENT" && pwd)/$TARGET_NAME
else
  fail "target directory does not exist: $TARGET"
fi

printf '%s\n' 'ai-engineering-harness installer'
print_install_plan
confirm_plan

if [ "$RUNTIME" != manual ]; then
  if [ "$DRY_RUN" -eq 1 ]; then
    printf '%s\n' '' "Dry-run complete: runtime '$RUNTIME' install is planned but not implemented yet."
    exit 0
  fi
  fail "Runtime '$RUNTIME' install is planned but not implemented yet. Use --runtime manual for fallback copy or wait for runtime-specific step."
fi

run_manual_install
