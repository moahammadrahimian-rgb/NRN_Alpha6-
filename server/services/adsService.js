const {getDB,saveDB}=require("../database/database");
const {now}=require("../utils/time");

async function create(title,content){
 const db=await getDB();
 db.run(
  "INSERT INTO ads(title,content,created_at) VALUES(?,?,?)",
  [title,content||"",now()]
 );
 saveDB();
 return list();
}

async function list(){
 const db=await getDB();
 const r=db.exec("SELECT * FROM ads ORDER BY id DESC");
 if(!r.length)return[];
 return r[0].values.map(v=>({
  id:v[0],title:v[1],content:v[2],created_at:v[3]
 }));
}

module.exports={create,list};
