const { getDB, saveDB } = require("../database/database");

async function log({
  actorUserId = null,
  action,
  targetType = null,
  targetId = null,
  metadata = null
}) {
  const db = await getDB();

  db.run(
    `INSERT INTO audit_logs
    (actor_user_id,action,target_type,target_id,metadata,created_at)
    VALUES (?,?,?,?,?,?)`,
    [
      actorUserId,
      action,
      targetType,
      targetId,
      metadata ? JSON.stringify(metadata) : null,
      new Date().toISOString()
    ]
  );

  saveDB();
}

module.exports = { log };
