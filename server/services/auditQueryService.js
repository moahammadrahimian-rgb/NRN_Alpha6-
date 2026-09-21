const {getDB}=require("../database/database");

function userLogs(userId,limit=100){
  const db=getDB();
  limit=Math.max(1,Math.min(Number(limit)||100,500));

  const r=db.exec(`
    SELECT id,action,entity_type,entity_id,created_at
    FROM audit_logs
    WHERE user_id=?
    ORDER BY id DESC
    LIMIT ${limit}
  `,[userId]);

  if(!r.length)return [];

  return r[0].values.map(x=>({
    id:x[0],
    action:x[1],
    entityType:x[2],
    entityId:x[3],
    createdAt:x[4]
  }));
}

module.exports={userLogs};
