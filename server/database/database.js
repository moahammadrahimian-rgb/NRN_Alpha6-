const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const dbFile = path.join(__dirname, "../../database/alpha6.db");

let db = null;
let SQL = null;

async function getDB() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file =>
        path.join(
          __dirname,
          "../../node_modules/sql.js/dist/",
          file
        )
    });
  }

  if (!db) {
    if (fs.existsSync(dbFile)) {
      db = new SQL.Database(fs.readFileSync(dbFile));
    } else {
      db = new SQL.Database();
    }
  }

  return db;
}

function saveDB() {
  if (!db) return;

  const data = db.export();
  fs.mkdirSync(path.dirname(dbFile), { recursive: true });
  fs.writeFileSync(dbFile, Buffer.from(data));
}

module.exports = {
  getDB,
  saveDB
};
