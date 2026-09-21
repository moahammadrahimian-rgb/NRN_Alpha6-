"use strict";

const bcrypt = require("bcryptjs");
const { getDB, saveDB } = require("../database/database");

async function createUser({ name, email, password }) {
  name = String(name || "").trim();
  email = String(email || "").trim().toLowerCase();
  password = String(password || "");

  if (!name || !email || !password) {
    throw new Error("نام، ایمیل و رمز عبور الزامی است");
  }

  if (password.length < 8) {
    throw new Error("رمز عبور باید حداقل ۸ کاراکتر باشد");
  }

  const db = await getDB();

  const exists = db.exec(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (exists.length) {
    throw new Error("این ایمیل قبلاً ثبت شده است");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  db.run(
    `INSERT INTO users
      (name, email, password_hash, role, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      name,
      email,
      passwordHash,
      "user",
      new Date().toISOString()
    ]
  );

  saveDB();

  const result = db.exec(
    `SELECT id, name, email, role, created_at
     FROM users
     WHERE email = ?`,
    [email]
  );

  if (!result.length || !result[0].values.length) {
    throw new Error("کاربر ثبت شد اما بازیابی اطلاعات کاربر ناموفق بود");
  }

  const columns = result[0].columns;
  const values = result[0].values[0];

  return Object.fromEntries(
    columns.map((key, i) => [key, values[i]])
  );
}

async function findByEmail(email) {
  const db = await getDB();

  const result = db.exec(
    "SELECT * FROM users WHERE email = ?",
    [String(email || "").trim().toLowerCase()]
  );

  if (!result.length || !result[0].values.length) {
    return null;
  }

  const columns = result[0].columns;
  const values = result[0].values[0];

  return Object.fromEntries(
    columns.map((key, i) => [key, values[i]])
  );
}

module.exports = {
  createUser,
  findByEmail
};
