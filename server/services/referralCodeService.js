const {getDB,saveDB}=require("../database/database");
const {now}=require("../utils/time");

function makeCode(){
 return "ALPHA6-"+Math.random().toString(36).slice(2,10).toUpperCase();
}

async function create(userId){
 const db=await getDB();
 const code=makeCode();
 db.run(
  "INSERT INTO referral_codes(user_id,code,created_at) VALUES(?,?,?)",
  [userId,code,now()]
 );
 saveDB();
 return code;
}

async function find(code){
 const db=await getDB();
 const r=db.exec(
  "SELECT id,user_id,code,created_at FROM referral_codes WHERE code=?",
  [code]
 );
 if(!r.length||!r[0].values.length)return null;
 const v=r[0].values[0];
 return {id:v[0],user_id:v[1],code:v[2],created_at:v[3]};
}

module.exports={create,find};
