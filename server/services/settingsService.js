const {getDB,saveDB}=require("../database/database");

function get(key,defaultValue=null){
  const db=getDB();

  const r=db.exec(
    "SELECT value FROM settings WHERE key=? LIMIT 1",
    [key]
  );

  if(!r.length||!r[0].values.length)return defaultValue;
  return r[0].values[0][0];
}

function set(key,value){
  const db=getDB();

  db.run(`
    INSERT INTO settings(key,value,updated_at)
    VALUES(?,?,datetime('now'))
    ON CONFLICT(key)
    DO UPDATE SET value=excluded.value,
                  updated_at=datetime('now')
  `,[key,String(value)]);

  saveDB();
}

module.exports={get,set};
