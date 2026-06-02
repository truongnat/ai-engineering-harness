const fs = require("fs");
const path = require("path");

const root = __dirname;
const requiredDirs = [
  "commands",
  "skills",
  "workflows",
  "patterns",
  "templates",
  "docs",
  path.join("examples", "demo-project")
];

let created = 0;

for (const dir of requiredDirs) {
  const fullPath = path.join(root, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    created += 1;
  }
}

console.log(`Harness install check complete. Created ${created} missing director${created === 1 ? "y" : "ies"}.`);
console.log("Run `npm run validate` to verify the repository contract.");
