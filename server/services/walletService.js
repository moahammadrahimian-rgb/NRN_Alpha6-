const {getDB,saveDB}=require("../database/database");

function ensure(userId){
  const db=getDB();

  db.run(`
    INSERT OR IGNORE INTO wallets
    (user_id,balance,locked_balance)
    VALUES(?,0,0)
  `,[userId]);

  saveDB();
}

function get(userId){
  ensure(userId);

  const db=getDB();

  const r=db.exec(`
    SELECT user_id,balance,locked_balance,updated_at
    FROM wallets
    WHERE user_id=?
  `,[userId]);

  if(!r.length || !r[0].values.length){
    return {
      userId,
      balance:0,
      lockedBalance:0
    };
  }

  const row=r[0].values[0];

  return {
    userId:row[0],
    balance:Number(row[1]),
    lockedBalance:Number(row[2]),
    updatedAt:row[3]
  };
}

function credit(userId,amount){
  if(!Number.isInteger(amount) || amount<=0){
    throw new Error("INVALID_AMOUNT");
  }

  ensure(userId);

  const db=getDB();

  db.run(`
    UPDATE wallets
    SET balance=balance+?,
        updated_at=datetime('now')
    WHERE user_id=?
  `,[amount,userId]);

  saveDB();

  return get(userId);
}

function debit(userId,amount){
  if(!Number.isInteger(amount) || amount<=0){
    throw new Error("INVALID_AMOUNT");
  }

  ensure(userId);

  const current=get(userId);

  if(current.balance<amount){
    throw new Error("INSUFFICIENT_BALANCE");
  }

  const db=getDB();

  db.run(`
    UPDATE wallets
    SET balance=balance-?,
        updated_at=datetime('now')
    WHERE user_id=?
  `,[amount,userId]);

  saveDB();

  return get(userId);
}

module.exports={ensure,get,credit,debit};
