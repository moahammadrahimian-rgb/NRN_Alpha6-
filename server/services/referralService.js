const crypto=require("crypto");
const {getDB,saveDB}=require("../database/database");

function createCode(userId){
  return "AL6-"+crypto
    .createHash("sha256")
    .update(String(userId)+"-ALPHA6")
    .digest("hex")
    .slice(0,12)
    .toUpperCase();
}

function create(userId,referredUserId){
  if(userId===referredUserId){
    throw new Error("INVALID_SELF_REFERRAL");
  }

  const code=createCode(userId);
  const db=getDB();

  db.run(`
    INSERT OR IGNORE INTO referrals
    (referrer_user_id,referred_user_id,code,status)
    VALUES(?,?,?,'pending')
  `,[
    userId,
    referredUserId,
    code
  ]);

  saveDB();

  return {
    referrerUserId:userId,
    referredUserId,
    code,
    status:"pending"
  };
}

function list(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT referred_user_id,code,status,created_at
    FROM referrals
    WHERE referrer_user_id=?
    ORDER BY created_at DESC
  `,[userId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    referredUserId:row[0],
    code:row[1],
    status:row[2],
    createdAt:row[3]
  }));
}

module.exports={createCode,create,list};
