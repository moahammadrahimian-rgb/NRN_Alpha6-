const { getDB } = require("../database/database");

async function getAccount(userId) {
  const db = await getDB();

  const result = db.exec(
    `SELECT id,name,email,role,created_at
     FROM users
     WHERE id = ?`,
    [userId]
  );

  if (!result.length) return null;

  const columns = result[0].columns;
  const values = result[0].values[0];

  return Object.fromEntries(
    columns.map((key, i) => [key, values[i]])
  );
}

module.exports = {
  getAccount
};
