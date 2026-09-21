const crypto=require("crypto");
const {getDB,saveDB}=require("../database/database");
const wallet=require("./walletService");

function createTest(userId,orderId,amount){
  amount=Number(amount);
  if(!Number.isInteger(amount)||amount<=0)throw new Error("INVALID_PAYMENT_AMOUNT");

  const tx="TEST-"+crypto.randomBytes(8).toString("hex").toUpperCase();
  const db=getDB();

  db.run(`
    INSERT INTO payments
    (user_id,order_id,amount,method,transaction_id,status)
    VALUES(?,?,?,?,?,'confirmed')
  `,[userId,orderId,amount,"test",tx]);

  db.run(`
    UPDATE orders
    SET payment_status='paid',status='paid',updated_at=datetime('now')
    WHERE id=? AND user_id=?
  `,[orderId,userId]);

  wallet.credit(userId,amount);
  saveDB();

  return {transactionId:tx,status:"confirmed",amount};
}

function list(userId){
  const db=getDB();
  const r=db.exec(`
    SELECT id,order_id,amount,method,transaction_id,status,created_at
    FROM payments WHERE user_id=? ORDER BY id DESC
  `,[userId]);

  if(!r.length)return [];
  return r[0].values.map(x=>({
    id:x[0],orderId:x[1],amount:Number(x[2]),
    method:x[3],transactionId:x[4],status:x[5],createdAt:x[6]
  }));
}

module.exports={createTest,list};
