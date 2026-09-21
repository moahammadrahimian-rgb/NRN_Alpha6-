const {getDB,saveDB}=require("../database/database");

function create(userId,title,message,type="system"){
  const db=getDB();

  db.run(`
    INSERT INTO notifications
    (user_id,title,message,type)
    VALUES(?,?,?,?)
  `,[
    userId,
    title,
    message,
    type
  ]);

  saveDB();
}

function list(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT id,title,message,type,is_read,created_at
    FROM notifications
    WHERE user_id=?
    ORDER BY created_at DESC
    LIMIT 100
  `,[userId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    id:row[0],
    title:row[1],
    message:row[2],
    type:row[3],
    isRead:Boolean(row[4]),
    createdAt:row[5]
  }));
}

function read(userId,id){
  const db=getDB();

  db.run(`
    UPDATE notifications
    SET is_read=1
    WHERE id=? AND user_id=?
  `,[id,userId]);

  saveDB();
}

module.exports={create,list,read};
