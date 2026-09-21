const {getDB,saveDB}=require("../database/database");

function isLocked(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT locked_until
    FROM account_locks
    WHERE user_id=?
    LIMIT 1
  `,[userId]);

  if(!r.length || !r[0].values.length) return false;

  const until=r[0].values[0][0];
  if(!until) return false;

  return new Date(until).getTime()>Date.now();
}

function lock(userId,minutes=15,reason="security"){
  const db=getDB();

  db.run(`
    INSERT OR REPLACE INTO account_locks
    (user_id,locked_until,reason)
    VALUES(?,datetime('now','+' || ? || ' minutes'),?)
  `,[userId,minutes,reason]);

  saveDB();
}

module.exports={isLocked,lock};
