const { getDB, saveDB } = require("./database");

async function seed() {
  const db = await getDB();

  const result = db.exec(
    "SELECT COUNT(*) AS count FROM users"
  );

  const count = Number(result[0].values[0][0]);

  if (count === 0) {
    db.run(
      `INSERT INTO users
       (name,email,password_hash,role,created_at)
       VALUES (?,?,?,?,?)`,
      [
        "SYSTEM",
        "system@alpha6.local",
        "SYSTEM_ACCOUNT_DISABLED",
        "system",
        new Date().toISOString()
      ]
    );
  }

  saveDB();
  console.log("Seed OK");
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
