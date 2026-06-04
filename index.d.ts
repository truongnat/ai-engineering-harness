/**
 * ai-engineering-harness TypeScript type definitions
 *
 * This package provides engineering discipline and workflow guardrails for AI coding agents.
 * It works with Claude, Cursor, Codex, Gemini, and other AI agent platforms.
 *
 * @see https://github.com/truongnat/ai-engineering-harness
 */

// ============================================================================
// CLI Main Entry Point
// ============================================================================

/**
 * Main CLI entry point for ai-engineering-harness
 *
 * @param argv - Command-line arguments (starting with node, script path)
 * @param moduleFilename - __filename of the calling module for pack root detection
 * @returns - Exit code (0 = success, 1 = error)
 *
 * @example
 * ```javascript
 * const { main } = require('ai-engineering-harness/lib/cli-main');
 * const code = await main(process.argv, __filename);
 * process.exit(code);
 * ```
 */
export function main(argv: string[], moduleFilename: string): Promise<number>;

// ============================================================================
// Runtime Command Catalog
// ============================================================================

/**
 * Provider-specific command support information
 */
export interface ProviderCommandSupport {
  /** Command ID (e.g., 'install', 'update', 'status') */
  id: string;
  /** Human-readable command name */
  name: string;
  /** Whether this provider supports this command natively */
  native: boolean;
  /** Whether the provider supports this via fallback rules */
  fallback: boolean;
  /** Invocation string for this command on this provider */
  invocation?: string;
}

/**
 * Runtime command catalog configuration
 */
export interface RuntimeCommandCatalog {
  /** Canonical command namespace */
  COMMAND_NAMESPACE: string;
  /** Cache directory path */
  CACHE_DIR: string;
  /** Provider-specific command support matrix */
  PROVIDER_COMMAND_SUPPORT: Record<string, ProviderCommandSupport[]>;
}

/**
 * Get provider-specific command support for a provider ID
 * @param providerId - Provider ID (claude, cursor, codex, gemini)
 * @returns - Array of command support info for that provider
 */
export function providerCommandSupport(providerId: string): ProviderCommandSupport[];

/**
 * Get the invocation string for a specific command on a provider
 * @param providerId - Provider ID
 * @param commandId - Command ID
 * @returns - Invocation string or undefined if not supported
 */
export function providerInvocationFor(
  providerId: string,
  commandId: string
): string | undefined;

/**
 * Build the complete command surface for installed providers
 * @param installedProviderEntrypoints - Map of provider IDs to their entrypoint paths
 * @returns - Complete command surface configuration
 */
export function buildCommandSurface(
  installedProviderEntrypoints: Record<string, string>
): object;

/**
 * Install runtime command catalog to target repository
 * @param targetRoot - Target repository root path
 * @param options - Installation options
 * @returns - Installation results
 */
export function installRuntimeCommandCatalog(
  targetRoot: string,
  options: InstallOptions
): object;

// ============================================================================
// Installation Options & Results
// ============================================================================

/**
 * Options for harness installation
 */
export interface InstallOptions {
  /** Dry run mode - show plan without writing files */
  dryRun?: boolean;
  /** Force overwrite existing files */
  force?: boolean;
  /** Target repository path */
  target?: string;
  /** Runtime name (claude, cursor, codex, gemini, manual) */
  runtime?: string;
  /** Scope (global, project) */
  scope?: string;
  /** Initialize .harness/ directory */
  initHarness?: boolean;
  /** Install capability cache */
  installCache?: boolean;
}

/**
 * Installation result for a single file
 */
export interface InstallResult {
  /** Action taken (COPY, SKIP, WOULD_COPY, WOULD_SKIP) */
  action: string;
  /** Relative path from target root */
  relativePath: string;
  /** Reason for action (new, exists, overwrite) */
  reason: string;
}

/**
 * Validation result for pack contracts
 */
export interface ValidationResult {
  /** Whether validation passed */
  passed: boolean;
  /** List of validation errors */
  errors: ValidationError[];
  /** Summary of what was validated */
  summary: {
    filesChecked: number;
    testsPassed: number;
    testsFailed: number;
  };
}

/**
 * Individual validation error
 */
export interface ValidationError {
  /** File path that failed validation */
  file: string;
  /** Error message */
  message: string;
  /** Severity (error, warning) */
  severity: "error" | "warning";
}

// ============================================================================
// File Operations
// ============================================================================

/**
 * Ensure a directory exists, creating it if necessary
 * @param dirPath - Directory path to ensure
 * @param dryRun - If true, don't actually create the directory
 * @returns - Whether the directory was created
 */
export function ensureDirectory(dirPath: string, dryRun?: boolean): boolean;

/**
 * Write a file with optional dry-run and force flags
 * @param filePath - File path to write to
 * @param content - File content
 * @param options - Write options (dryRun, force)
 * @param logFn - Optional logging function
 */
export function writeFileWithDryRun(
  filePath: string,
  content: string,
  options?: { dryRun?: boolean; force?: boolean },
  logFn?: (message: string) => void
): void;

// ============================================================================
// Validation
// ============================================================================

/**
 * Validate pack contracts (main validation entry point)
 * @param packRoot - Root directory of the harness pack
 * @param options - Validation options
 * @returns - Validation results
 */
export function validatePack(packRoot: string, options?: object): ValidationResult;

// ============================================================================
// Provider Detection & Diagnosis
// ============================================================================

/**
 * Detect installed AI agents on the system
 * @returns - Map of provider IDs to their installation info
 */
export function detectInstalledProviders(): Record<
  string,
  { installed: boolean; version?: string }
>;

/**
 * Get recommended providers for a target repository
 * @param targetPath - Target repository path
 * @returns - Array of recommended provider IDs
 */
export function detectRecommendedProviders(targetPath: string): string[];

// ============================================================================
// Module Exports
// ============================================================================

export const cliMain: {
  main: typeof main;
};

export const runtimeCommandCatalog: RuntimeCommandCatalog & {
  providerCommandSupport: typeof providerCommandSupport;
  providerInvocationFor: typeof providerInvocationFor;
  buildCommandSurface: typeof buildCommandSurface;
  installRuntimeCommandCatalog: typeof installRuntimeCommandCatalog;
};

export const fileOperations: {
  ensureDirectory: typeof ensureDirectory;
  writeFileWithDryRun: typeof writeFileWithDryRun;
};
