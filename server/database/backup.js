const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "../../database/alpha6.db");
const backupDir = path.join(__dirname, "../../backups");

if (!fs.existsSync(source)) {
  console.log("No database to backup");
  process.exit(0);
}

fs.mkdirSync(backupDir, { recursive: true });

const filename =
  "alpha6-" +
  new Date().toISOString().replace(/[:.]/g, "-") +
  ".db";

fs.copyFileSync(
  source,
  path.join(backupDir, filename)
);

console.log("Backup created:", filename);
