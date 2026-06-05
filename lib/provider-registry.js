"use strict";

const fs = require("node:fs");
const path = require("node:path");

const PROVIDER_IDS = ["claude", "cursor", "codex", "gemini"];

function loadProviderManifests(packRoot) {
  const providersDir = path.join(packRoot, "providers");
  const manifests = [];

  for (const id of PROVIDER_IDS) {
    const manifestPath = path.join(providersDir, `${id}.json`);
    if (!fs.existsSync(manifestPath)) {
      continue;
    }
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.id !== id) {
      throw new Error(`Provider manifest id mismatch: ${manifestPath}`);
    }
    manifests.push(manifest);
  }

  return manifests.sort((left, right) => left.id.localeCompare(right.id));
}

function getProviderManifest(packRoot, providerId) {
  const manifestPath = path.join(packRoot, "providers", `${providerId}.json`);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Unknown provider manifest: ${providerId}`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

module.exports = {
  PROVIDER_IDS,
  getProviderManifest,
  loadProviderManifests,
};
