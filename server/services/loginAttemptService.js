const {getDB,saveDB}=require("../database/database");

function record(identifier,ip,success){
  const db=getDB();

  db.run(`
    INSERT INTO login_attempts
    (identifier,ip_address,success,created_at)
    VALUES(?,?,?,datetime('now'))
  `,[
    identifier,
    ip||"",
    success?1:0
  ]);

  saveDB();
}

function failures(identifier,minutes=15){
  const db=getDB();

  const r=db.exec(`
    SELECT COUNT(*)
    FROM login_attempts
    WHERE identifier=?
      AND success=0
      AND created_at >= datetime('now','-' || ? || ' minutes')
  `,[identifier,minutes]);

  return Number(r[0]?.values?.[0]?.[0]||0);
}

module.exports={record,failures};
