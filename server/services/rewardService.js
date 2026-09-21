const {getDB,saveDB}=require("../database/database");
const wallet=require("./walletService");

function add(userId,amount,type="reward",neuronId=null,referenceId=null){
  if(!Number.isInteger(amount) || amount<=0){
    throw new Error("INVALID_REWARD_AMOUNT");
  }

  wallet.credit(userId,amount);

  const db=getDB();

  db.run(`
    INSERT INTO reward_ledger
    (user_id,neuron_id,type,amount,reference_id,status)
    VALUES(?,?,?,?,?,'confirmed')
  `,[
    userId,
    neuronId,
    type,
    amount,
    referenceId
  ]);

  saveDB();

  return wallet.get(userId);
}

function history(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT id,neuron_id,type,amount,reference_id,status,created_at
    FROM reward_ledger
    WHERE user_id=?
    ORDER BY created_at DESC
  `,[userId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    id:row[0],
    neuronId:row[1],
    type:row[2],
    amount:Number(row[3]),
    referenceId:row[4],
    status:row[5],
    createdAt:row[6]
  }));
}

module.exports={add,history};
