[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [ValidateSet("install", "status", "doctor", "update", "uninstall", "help")]
  [string]$Command = "install",

  [string]$Runtime,

  [string]$Target = ".",

  [string]$Ref = "main",

  [switch]$DryRun,

  [switch]$Yes,

  [ValidateSet("private", "shared")]
  [string]$Visibility = "private",

  [ValidateSet("project", "global")]
  [string]$Scope = "project"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Show-AihHelp {
  @"
ai-engineering-harness PowerShell bootstrap (experimental)

Usage:
  .\aih.ps1 [install] [-Runtime <name>] [-Target <path>] [-Ref <git-ref>] [-DryRun] [-Yes] [-Visibility <name>] [-Scope <name>]
  .\aih.ps1 status
  .\aih.ps1 doctor
  .\aih.ps1 update
  .\aih.ps1 uninstall

Examples:
  powershell -ExecutionPolicy Bypass -File .\aih.ps1 install -Runtime cursor
  powershell -ExecutionPolicy Bypass -File .\aih.ps1 status

Notes:
  - This wrapper is experimental.
  - It downloads aih.sh, then runs it through sh.
  - Native PowerShell install logic is planned, not shipped.
"@
}

function Invoke-AihBootstrap {
  [CmdletBinding()]
  param(
    [ValidateSet("install", "status", "doctor", "update", "uninstall", "help")]
    [string]$Command = "install",
    [string]$Runtime,
    [string]$Target = ".",
    [string]$Ref = "main",
    [switch]$DryRun,
    [switch]$Yes,
    [ValidateSet("private", "shared")]
    [string]$Visibility = "private",
    [ValidateSet("project", "global")]
    [string]$Scope = "project"
  )

  if ($Command -eq "help") {
    Show-AihHelp
    return
  }

  $shCommand = Get-Command sh -ErrorAction SilentlyContinue
  if (-not $shCommand) {
    throw "sh was not found. Install Git for Windows and run from Git Bash, or install WSL. Native PowerShell mode is planned."
  }

  $scriptUrl = "https://raw.githubusercontent.com/truongnat/ai-engineering-harness/$Ref/aih.sh"
  $tempScript = Join-Path ([System.IO.Path]::GetTempPath()) ("aih-{0}.sh" -f [System.Guid]::NewGuid().ToString("N"))

  try {
    $curlExe = Get-Command curl.exe -ErrorAction SilentlyContinue
    if ($curlExe) {
      & $curlExe.Source "-fsSL" $scriptUrl "-o" $tempScript
      if ($LASTEXITCODE -ne 0) {
        throw "Failed to download $scriptUrl with curl.exe."
      }
    } else {
      Invoke-WebRequest -Uri $scriptUrl -OutFile $tempScript
    }

    $shArgs = @($tempScript, $Command, "--target", $Target, "--ref", $Ref, "--scope", $Scope, "--visibility", $Visibility)
    if ($Runtime) {
      $shArgs += @("--runtime", $Runtime)
    }
    if ($DryRun) {
      $shArgs += "--dry-run"
    }
    if ($Yes) {
      $shArgs += "--yes"
    }

    & $shCommand.Source @shArgs
    if ($LASTEXITCODE -ne 0) {
      exit $LASTEXITCODE
    }
  } finally {
    if (Test-Path -LiteralPath $tempScript) {
      Remove-Item -LiteralPath $tempScript -Force -ErrorAction SilentlyContinue
    }
  }
}

function global:aih {
  [CmdletBinding()]
  param(
    [Parameter(Position = 0)]
    [ValidateSet("install", "status", "doctor", "update", "uninstall", "help")]
    [string]$Command = "install",
    [string]$Runtime,
    [string]$Target = ".",
    [string]$Ref = "main",
    [switch]$DryRun,
    [switch]$Yes,
    [ValidateSet("private", "shared")]
    [string]$Visibility = "private",
    [ValidateSet("project", "global")]
    [string]$Scope = "project"
  )

  Invoke-AihBootstrap @PSBoundParameters
}

Invoke-AihBootstrap @PSBoundParameters
