const {getDB}=require("../database/database");

function owns(userId,neuronId){
  const db=getDB();

  const r=db.exec(`
    SELECT 1
    FROM neurons
    WHERE id=? AND user_id=?
    LIMIT 1
  `,[neuronId,userId]);

  return !!(r.length && r[0].values.length);
}

function owner(neuronId){
  const db=getDB();

  const r=db.exec(`
    SELECT user_id
    FROM neurons
    WHERE id=?
    LIMIT 1
  `,[neuronId]);

  if(!r.length || !r[0].values.length) return null;

  return r[0].values[0][0];
}

module.exports={owns,owner};
