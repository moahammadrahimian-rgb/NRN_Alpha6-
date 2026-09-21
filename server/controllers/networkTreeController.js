const treeService=require("../services/networkTreeService");
const ownership=require("../services/neuronOwnershipService");

function get(req,res,next){
  try{
    if(!ownership.owns(req.user.id,req.params.id)){
      return res.status(403).json({
        ok:false,
        error:"NEURON_ACCESS_DENIED"
      });
    }

    const depth=Math.min(
      Math.max(Number(req.query.depth)||10,1),
      20
    );

    res.json({
      ok:true,
      root:req.params.id,
      depth,
      tree:treeService.tree(req.params.id,depth)
    });
  }catch(err){
    next(err);
  }
}

module.exports={get};
