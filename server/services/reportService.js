const {getDB,saveDB}=require("../database/database");

function create(userId,data){
  const targetType=String(data.targetType||"").trim();
  const targetId=String(data.targetId||"").trim();
  const reason=String(data.reason||"").trim();

  if(!targetType||!targetId||!reason){
    throw new Error("REPORT_FIELDS_REQUIRED");
  }

  const db=getDB();

  db.run(`
    INSERT INTO reports
    (user_id,target_type,target_id,reason,details)
    VALUES(?,?,?,?,?)
  `,[
    userId,targetType,targetId,reason,
    String(data.details||"")
  ]);

  saveDB();

  return {ok:true,message:"REPORT_CREATED"};
}

module.exports={create};
