const {getDB,saveDB}=require("../database/database");
const {now}=require("../utils/time");

async function create(userId,title,description){
 const db=await getDB();
 db.run(
  "INSERT INTO listings(user_id,title,description,created_at) VALUES(?,?,?,?)",
  [userId,title,description||"",now()]
 );
 saveDB();
 return true;
}

async function list(){
 const db=await getDB();
 const r=db.exec("SELECT * FROM listings ORDER BY id DESC");
 if(!r.length)return[];
 return r[0].values.map(v=>({
  id:v[0],user_id:v[1],title:v[2],
  description:v[3],created_at:v[4]
 }));
}

module.exports={create,list};
