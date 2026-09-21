const {getDB,saveDB}=require("../database/database");

function create(userId,data){
  const subject=String(data.subject||"").trim();
  const message=String(data.message||"").trim();

  if(!subject||!message)throw new Error("HELP_FIELDS_REQUIRED");

  const db=getDB();

  db.run(`
    INSERT INTO help_messages(user_id,subject,message)
    VALUES(?,?,?)
  `,[userId,subject,message]);

  saveDB();

  return {ok:true,message:"HELP_TICKET_CREATED"};
}

function list(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT id,subject,message,status,created_at
    FROM help_messages
    WHERE user_id=?
    ORDER BY id DESC
  `,[userId]);

  if(!r.length)return [];

  return r[0].values.map(x=>({
    id:x[0],subject:x[1],message:x[2],
    status:x[3],createdAt:x[4]
  }));
}

module.exports={create,list};
