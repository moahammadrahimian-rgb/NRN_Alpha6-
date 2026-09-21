"use strict";

const { getDB, saveDB } = require("./database");

async function migrate() {
  const db = await getDB();

  db.run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT UNIQUE NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);

  const tables = db.exec(`
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name='users'
  `);

  if (tables.length) {
    const info = db.exec(`PRAGMA table_info(users)`);
    const columns = info.length
      ? info[0].values.map(row => row[1])
      : [];

    const newSchema =
      columns.includes("name") &&
      columns.includes("email") &&
      columns.includes("password_hash") &&
      columns.includes("role");

    if (!newSchema) {
      const legacyExists = db.exec(`
        SELECT name
        FROM sqlite_master
        WHERE type='table' AND name='users_legacy_v1'
      `);

      if (!legacyExists.length) {
        db.run(`ALTER TABLE users RENAME TO users_legacy_v1`);
      }
    }
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email
    ON users(email)
  `);

  const version = "users_v2";

  const applied = db.exec(
    `SELECT id FROM schema_migrations WHERE version = ?`,
    [version]
  );

  if (!applied.length) {
    db.run(
      `INSERT INTO schema_migrations(version, applied_at)
       VALUES (?, ?)`,
      [version, new Date().toISOString()]
    );
  }

  saveDB();

  console.log("=================================");
  console.log("ALPHA-6 DATABASE MIGRATION");
  console.log("USERS_SCHEMA=OK");
  console.log("MIGRATION=users_v2");
  console.log("DATABASE_SAVED=OK");
  console.log("=================================");
}

migrate().catch(err => {
  console.error("MIGRATION_FAIL:", err);
  process.exit(1);
});
