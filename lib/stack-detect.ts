import fs from "node:fs";
import path from "node:path";

type DomainId =
  | "frontend"
  | "backend"
  | "devops"
  | "mobile"
  | "data-ai"
  | "security"
  | "cloud"
  | "debugging";

interface DomainSuggestion {
  id: DomainId;
  label: string;
  confidence: number;
  evidence: string[];
}

interface ProjectStackDetection {
  domains: DomainSuggestion[];
}

interface PackageJsonLike {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

const DOMAIN_LABELS: Record<DomainId, string> = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  mobile: "Mobile",
  "data-ai": "Data & AI",
  security: "Security",
  cloud: "Cloud",
  debugging: "Debugging",
};

const FRONTEND_PACKAGES = ["next", "react", "react-dom", "vue", "svelte", "@angular/core"];

const BACKEND_PACKAGES = ["express", "fastify", "@nestjs/core", "koa", "hapi", "restify"];

const DATA_AI_PACKAGES = [
  "pandas",
  "numpy",
  "scikit-learn",
  "torch",
  "tensorflow",
  "langchain",
  "llamaindex",
  "openai",
  "transformers",
  "spacy",
];

const SECURITY_PACKAGES = [
  "passport",
  "jose",
  "bcrypt",
  "argon2",
  "oauth",
  "auth0",
  "jsonwebtoken",
  "@auth/core",
];

const CLOUD_PACKAGES = [
  "@aws-sdk/client-s3",
  "@aws-sdk",
  "aws-sdk",
  "@azure",
  "@google-cloud",
  "cloudflare",
  "wrangler",
  "serverless",
];

const MOBILE_MARKERS = [
  "pubspec.yaml",
  "android/build.gradle",
  "android/app/build.gradle",
  "ios/Podfile",
  "ios/",
  "build.gradle",
  "build.gradle.kts",
  "*.xcodeproj",
];

const DEVOPS_MARKERS = [
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose.yaml",
  ".github/workflows/",
  "k8s/",
  "kubernetes/",
  "infra/",
  "terraform/",
  "*.tf",
  "*.tfvars",
];

function readTextIfExists(filePath: string): string | null {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function readPackageJson(targetAbs: string): PackageJsonLike {
  const packageJsonPath = path.join(targetAbs, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJsonLike;
  } catch {
    return {};
  }
}

function collectDependencies(pkg: PackageJsonLike): string[] {
  const groups = [
    pkg.dependencies,
    pkg.devDependencies,
    pkg.peerDependencies,
    pkg.optionalDependencies,
  ];
  const deps = new Set<string>();
  for (const group of groups) {
    if (!group) continue;
    for (const key of Object.keys(group)) {
      deps.add(key);
    }
  }
  return [...deps];
}

function hasAnyDependency(deps: string[], candidates: string[]): boolean {
  return deps.some((dep) =>
    candidates.some((candidate) => dep === candidate || dep.startsWith(`${candidate}/`))
  );
}

function fileExists(targetAbs: string, relativePath: string): boolean {
  return fs.existsSync(path.join(targetAbs, relativePath));
}

function anyMarkerExists(targetAbs: string, markers: string[]): string[] {
  return markers.filter((marker) => {
    if (marker.includes("*")) {
      const baseDir = path.dirname(marker);
      const globSuffix = path.basename(marker).replace(/\./g, "\\.").replace(/\*/g, ".*");
      const directory = path.join(targetAbs, baseDir);
      if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
        return false;
      }
      const files = fs.readdirSync(directory);
      const re = new RegExp(`^${globSuffix}$`);
      return files.some((file) => re.test(file));
    }
    return fileExists(targetAbs, marker);
  });
}

function firstExistingText(targetAbs: string, relativePaths: string[]): string | null {
  for (const relativePath of relativePaths) {
    const fullPath = path.join(targetAbs, relativePath);
    const text = readTextIfExists(fullPath);
    if (text !== null) {
      return text;
    }
  }
  return null;
}

function createSuggestion(id: DomainId, confidence: number, evidence: string[]): DomainSuggestion {
  return {
    id,
    label: DOMAIN_LABELS[id],
    confidence,
    evidence,
  };
}

function detectProjectStack(targetAbs: string): ProjectStackDetection {
  const pkg = readPackageJson(targetAbs);
  const deps = collectDependencies(pkg);
  const suggestions: DomainSuggestion[] = [];

  if (
    hasAnyDependency(deps, FRONTEND_PACKAGES) ||
    fileExists(targetAbs, "app") ||
    fileExists(targetAbs, "pages") ||
    fileExists(targetAbs, "src/components") ||
    fileExists(targetAbs, "src/app") ||
    fileExists(targetAbs, "src/pages")
  ) {
    suggestions.push(
      createSuggestion("frontend", 0.95, [
        "frontend packages or app/pages/component layout detected",
      ])
    );
  }

  const pythonText = firstExistingText(targetAbs, [
    "requirements.txt",
    "requirements-dev.txt",
    "pyproject.toml",
    "Pipfile",
  ]);
  if (
    hasAnyDependency(deps, BACKEND_PACKAGES) ||
    Boolean(
      pythonText && /fastapi|django|flask|starlette|sqlalchemy|uvicorn|gunicorn/i.test(pythonText)
    )
  ) {
    suggestions.push(
      createSuggestion("backend", 0.9, [
        hasAnyDependency(deps, BACKEND_PACKAGES)
          ? "backend server packages detected"
          : "python backend framework detected",
      ])
    );
  }

  if (anyMarkerExists(targetAbs, DEVOPS_MARKERS).length > 0) {
    suggestions.push(createSuggestion("devops", 0.88, ["Docker, CI, or infra markers detected"]));
  }

  if (
    fileExists(targetAbs, "pubspec.yaml") ||
    fileExists(targetAbs, "android") ||
    fileExists(targetAbs, "ios") ||
    fileExists(targetAbs, "android/app/build.gradle") ||
    fileExists(targetAbs, "ios/Podfile") ||
    fileExists(targetAbs, "build.gradle") ||
    fileExists(targetAbs, "build.gradle.kts") ||
    anyMarkerExists(targetAbs, ["*.xcodeproj"]).length > 0
  ) {
    suggestions.push(createSuggestion("mobile", 0.92, ["mobile platform markers detected"]));
  }

  if (
    hasAnyDependency(deps, DATA_AI_PACKAGES) ||
    Boolean(
      firstExistingText(targetAbs, ["requirements.txt", "pyproject.toml"]) &&
      /pandas|numpy|scikit-learn|torch|tensorflow|langchain|llamaindex|openai|transformers/i.test(
        firstExistingText(targetAbs, ["requirements.txt", "pyproject.toml"]) || ""
      )
    ) ||
    fileExists(targetAbs, "notebooks") ||
    fileExists(targetAbs, "data")
  ) {
    suggestions.push(createSuggestion("data-ai", 0.84, ["data or model tooling detected"]));
  }

  if (
    hasAnyDependency(deps, SECURITY_PACKAGES) ||
    Boolean(
      firstExistingText(targetAbs, ["package.json", "pyproject.toml"]) &&
      /auth|security|oauth|jwt|passport|bcrypt|argon2/i.test(
        firstExistingText(targetAbs, ["package.json", "pyproject.toml"]) || ""
      )
    )
  ) {
    suggestions.push(createSuggestion("security", 0.7, ["auth/security packages detected"]));
  }

  if (
    hasAnyDependency(deps, CLOUD_PACKAGES) ||
    anyMarkerExists(targetAbs, ["terraform/", "k8s/"]).length > 0
  ) {
    suggestions.push(createSuggestion("cloud", 0.75, ["cloud or infra provider markers detected"]));
  }

  const testFilesPresent =
    fileExists(targetAbs, "test") ||
    fileExists(targetAbs, "tests") ||
    fileExists(targetAbs, "__tests__") ||
    Boolean(firstExistingText(targetAbs, ["package.json"])?.match(/"test":|"vitest"|jest|mocha/i));
  if (testFilesPresent) {
    suggestions.push(createSuggestion("debugging", 0.55, ["test surface present"]));
  }

  suggestions.sort((a, b) => b.confidence - a.confidence || a.label.localeCompare(b.label));
  return { domains: suggestions };
}

function listSuggestedDomainIds(targetAbs: string, threshold = 0.6): DomainId[] {
  return detectProjectStack(targetAbs)
    .domains.filter((domain) => domain.confidence >= threshold)
    .map((domain) => domain.id);
}

function normalizeDomainSelection(values: string[]): DomainId[] {
  const valid = new Set<DomainId>([
    "frontend",
    "backend",
    "devops",
    "mobile",
    "data-ai",
    "security",
    "cloud",
    "debugging",
  ]);
  return [
    ...new Set(
      values
        .map((value) => value.trim())
        .filter((value): value is DomainId => valid.has(value as DomainId))
    ),
  ];
}

function isKnownDomainId(value: string): value is DomainId {
  return normalizeDomainSelection([value]).length > 0;
}

export {
  DOMAIN_LABELS,
  detectProjectStack,
  isKnownDomainId,
  listSuggestedDomainIds,
  normalizeDomainSelection,
};
export type { DomainId, DomainSuggestion, ProjectStackDetection };
