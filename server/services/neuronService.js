const {getDB,saveDB}=require("../database/database");
const {createNeuronId}=require("../utils/neuronId");

function create(userId){
  const db=getDB();
  const id=createNeuronId();

  db.run(`
    INSERT INTO neurons
    (id,user_id,status,created_at)
    VALUES(?,?,?,datetime('now'))
  `,[
    id,
    userId,
    "active"
  ]);

  saveDB();

  return {
    id,
    userId,
    status:"active"
  };
}

function listByUser(userId){
  const db=getDB();

  const r=db.exec(`
    SELECT id,user_id,status,created_at
    FROM neurons
    WHERE user_id=?
    ORDER BY created_at DESC
  `,[userId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    id:row[0],
    userId:row[1],
    status:row[2],
    createdAt:row[3]
  }));
}

function get(id,userId){
  const db=getDB();

  const r=db.exec(`
    SELECT id,user_id,status,created_at
    FROM neurons
    WHERE id=? AND user_id=?
    LIMIT 1
  `,[id,userId]);

  if(!r.length || !r[0].values.length) return null;

  const row=r[0].values[0];

  return {
    id:row[0],
    userId:row[1],
    status:row[2],
    createdAt:row[3]
  };
}

module.exports={create,listByUser,get};
