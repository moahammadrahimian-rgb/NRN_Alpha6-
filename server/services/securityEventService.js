const {getDB,saveDB}=require("../database/database");

function record(userId,eventType,ip="",meta={}){
  const db=getDB();

  db.run(`
    INSERT INTO security_events
    (user_id,event_type,ip_address,metadata,created_at)
    VALUES(?,?,?,?,datetime('now'))
  `,[
    userId||null,
    eventType,
    ip,
    JSON.stringify(meta||{})
  ]);

  saveDB();
}

module.exports={record};
