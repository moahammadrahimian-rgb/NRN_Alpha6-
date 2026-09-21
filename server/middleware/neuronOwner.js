const ownership=require("../services/neuronOwnershipService");

function requireNeuronOwner(param="id"){
  return (req,res,next)=>{
    try{
      const neuronId=req.params[param]||req.body.neuronId;

      if(!neuronId){
        return res.status(400).json({
          ok:false,
          error:"NEURON_ID_REQUIRED"
        });
      }

      if(!ownership.owns(req.user.id,neuronId)){
        return res.status(403).json({
          ok:false,
          error:"NEURON_ACCESS_DENIED"
        });
      }

      next();
    }catch(err){
      next(err);
    }
  };
}

module.exports={requireNeuronOwner};
