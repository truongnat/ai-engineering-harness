#!/bin/sh
# Secure installer for ai-engineering-harness with checksum verification
# Usage: curl -fsSL https://raw.githubusercontent.com/truongnat/ai-engineering-harness/main/install-secure.sh | sh

set -eu

REPO="truongnat/ai-engineering-harness"
BRANCH="${1:-main}"
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo "🔐 ai-engineering-harness secure installer"
echo "Repository: $REPO ($BRANCH)"
echo ""

# Step 1: Download aih.sh
echo "📥 Downloading aih.sh..."
curl -fsSL \
  "https://raw.githubusercontent.com/$REPO/$BRANCH/aih.sh" \
  -o "$TEMP_DIR/aih.sh" || {
  echo "❌ Failed to download aih.sh" >&2
  exit 1
}

# Step 2: Download checksum
echo "🔎 Downloading checksum..."
curl -fsSL \
  "https://raw.githubusercontent.com/$REPO/$BRANCH/aih.sh.sha256" \
  -o "$TEMP_DIR/aih.sh.sha256" || {
  echo "⚠️  Warning: Could not download checksum file" >&2
  echo "   Proceeding without verification (not recommended)" >&2
  echo ""
  sh "$TEMP_DIR/aih.sh" "$@"
  exit $?
}

# Step 3: Verify checksum
echo "✅ Verifying checksum..."
cd "$TEMP_DIR"
if ! sha256sum -c aih.sh.sha256 > /dev/null 2>&1; then
  echo "❌ Checksum verification failed!" >&2
  echo "   aih.sh may have been tampered with." >&2
  echo "   Installation aborted." >&2
  exit 1
fi
echo "✓ Checksum verified"

# Step 4: Execute aih.sh with all passed arguments
echo ""
echo "🚀 Running aih.sh install..."
echo ""
sh "$TEMP_DIR/aih.sh" "$@"
