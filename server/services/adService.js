const {getDB,saveDB}=require("../database/database");

function create(userId,data){
  const title=String(data.title||"").trim();
  if(!title)throw new Error("AD_TITLE_REQUIRED");

  const db=getDB();

  db.run(`
    INSERT INTO ads
    (owner_user_id,title,body,media_url,target_url,status)
    VALUES(?,?,?,?,?,'pending')
  `,[
    userId,title,
    String(data.body||""),
    String(data.mediaUrl||""),
    String(data.targetUrl||"")
  ]);

  saveDB();

  return {
    ok:true,
    message:"AD_SUBMITTED"
  };
}

function active(){
  const db=getDB();

  const r=db.exec(`
    SELECT id,title,body,media_url,target_url,created_at
    FROM ads WHERE status='active'
    ORDER BY id DESC LIMIT 100
  `);

  if(!r.length)return [];

  return r[0].values.map(x=>({
    id:x[0],title:x[1],body:x[2],
    mediaUrl:x[3],targetUrl:x[4],createdAt:x[5]
  }));
}

module.exports={create,active};
