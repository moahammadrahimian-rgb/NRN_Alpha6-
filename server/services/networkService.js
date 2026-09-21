const {getDB,saveDB}=require("../database/database");

function connect(parentNeuronId,childNeuronId,type="referral"){
  if(parentNeuronId===childNeuronId){
    throw new Error("INVALID_SELF_RELATION");
  }

  const db=getDB();

  db.run(`
    INSERT OR IGNORE INTO neuron_relations
    (parent_neuron_id,child_neuron_id,relation_type)
    VALUES(?,?,?)
  `,[
    parentNeuronId,
    childNeuronId,
    type
  ]);

  saveDB();
}

function children(neuronId){
  const db=getDB();

  const r=db.exec(`
    SELECT child_neuron_id,relation_type,created_at
    FROM neuron_relations
    WHERE parent_neuron_id=?
    ORDER BY created_at DESC
  `,[neuronId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    neuronId:row[0],
    relationType:row[1],
    createdAt:row[2]
  }));
}

function parents(neuronId){
  const db=getDB();

  const r=db.exec(`
    SELECT parent_neuron_id,relation_type,created_at
    FROM neuron_relations
    WHERE child_neuron_id=?
    ORDER BY created_at DESC
  `,[neuronId]);

  if(!r.length) return [];

  return r[0].values.map(row=>({
    neuronId:row[0],
    relationType:row[1],
    createdAt:row[2]
  }));
}

module.exports={connect,children,parents};
