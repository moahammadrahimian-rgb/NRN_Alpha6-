const {getDB,saveDB}=require("../database/database");
const {hashToken}=require("../utils/sessionToken");

function create(userId,token,deviceId=""){
  const db=getDB();

  const tokenHash=hashToken(token);

  db.run(`
    INSERT INTO user_sessions
    (user_id,token_hash,device_id,created_at)
    VALUES(?,?,?,datetime('now'))
  `,[userId,tokenHash,deviceId]);

  saveDB();
}

function remove(token){
  const db=getDB();

  db.run(
    "DELETE FROM user_sessions WHERE token_hash=?",
    [hashToken(token)]
  );

  saveDB();
}

function valid(token){
  const db=getDB();

  const r=db.exec(`
    SELECT user_id
    FROM user_sessions
    WHERE token_hash=?
    LIMIT 1
  `,[hashToken(token)]);

  if(!r.length || !r[0].values.length) return null;

  return r[0].values[0][0];
}

module.exports={create,remove,valid};
