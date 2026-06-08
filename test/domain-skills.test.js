const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const stackDetect = require(path.join(repoRoot, "dist", "lib", "stack-detect.js"));
const domainSkills = require(path.join(repoRoot, "dist", "lib", "domain-skill-generation.js"));

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aih-domain-test-"));
}

test("detectProjectStack suggests domain skills from repo signals", () => {
  const dir = makeTempDir();
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: "sample",
        dependencies: {
          react: "^18.0.0",
          express: "^4.0.0",
          "@aws-sdk/client-s3": "^3.0.0",
          passport: "^0.7.0",
        },
        devDependencies: {
          jest: "^29.0.0",
        },
        scripts: {
          test: "jest",
        },
      },
      null,
      2
    )
  );
  fs.writeFileSync(path.join(dir, "Dockerfile"), "FROM node:20\n");

  const detection = stackDetect.detectProjectStack(dir);
  const ids = detection.domains.map((domain) => domain.id);

  assert.ok(ids.includes("frontend"));
  assert.ok(ids.includes("backend"));
  assert.ok(ids.includes("cloud"));
  assert.ok(ids.includes("security"));
  assert.ok(ids.includes("devops"));
  assert.ok(ids.includes("debugging"));
  assert.equal(stackDetect.listSuggestedDomainIds(dir).includes("frontend"), true);
});

test("writeDomainSkillSurface creates generated skill files and config selection", () => {
  const target = makeTempDir();
  fs.mkdirSync(path.join(target, ".claude"), { recursive: true });
  fs.mkdirSync(path.join(target, ".cursor"), { recursive: true });

  const result = domainSkills.writeDomainSkillSurface(repoRoot, target, ["frontend", "security"], {
    packRoot: repoRoot,
    targetAbs: target,
    dryRun: false,
    force: false,
  });

  assert.ok(result.created.includes(".harness/config.json"));
  assert.ok(result.created.includes(".harness/SKILLS.md"));
  assert.ok(result.created.includes(".harness/WORKFLOW.md"));
  assert.ok(result.created.includes(".harness/skills/.gitkeep"));
  assert.ok(result.created.includes(".harness/skills/frontend/SKILL.md"));
  assert.ok(result.created.includes(".harness/skills/security/SKILL.md"));
  assert.ok(result.created.includes(".claude/rules/domain-frontend.md"));
  assert.ok(result.created.includes(".cursor/rules/domain-security.mdc"));

  const config = JSON.parse(fs.readFileSync(path.join(target, ".harness", "config.json"), "utf8"));
  assert.deepEqual(config.domains, ["frontend", "security"]);

  const skills = fs.readFileSync(path.join(target, ".harness", "SKILLS.md"), "utf8");
  const workflow = fs.readFileSync(path.join(target, ".harness", "WORKFLOW.md"), "utf8");
  assert.match(skills, /Selected Domain Skills/);
  assert.match(skills, /frontend/);
  assert.match(workflow, /Domain Selection/);
});
