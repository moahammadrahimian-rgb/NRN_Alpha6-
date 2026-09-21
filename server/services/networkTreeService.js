const {getDB}=require("../database/database");

function tree(rootId,maxDepth=10){
  const db=getDB();
  const result=[];
  const visited=new Set();

  function walk(id,depth){
    if(depth>maxDepth) return;
    if(visited.has(id)) return;

    visited.add(id);

    const r=db.exec(`
      SELECT child_neuron_id,relation_type
      FROM neuron_relations
      WHERE parent_neuron_id=?
    `,[id]);

    const children=r.length
      ? r[0].values.map(row=>({
          id:row[0],
          relationType:row[1]
        }))
      : [];

    result.push({
      id,
      depth,
      children:children.map(x=>x.id)
    });

    for(const child of children){
      walk(child.id,depth+1);
    }
  }

  walk(rootId,0);

  return result;
}

module.exports={tree};
