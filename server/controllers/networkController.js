const network=require("../services/networkService");
const neuron=require("../services/neuronService");

function connect(req,res,next){
  try{
    const parent=neuron.get(
      req.body.parentNeuronId,
      req.user.id
    );

    if(!parent){
      return res.status(404).json({
        ok:false,
        error:"PARENT_NEURON_NOT_FOUND"
      });
    }

    network.connect(
      req.body.parentNeuronId,
      req.body.childNeuronId,
      req.body.type||"referral"
    );

    res.json({
      ok:true,
      message:"NETWORK_CONNECTED"
    });
  }catch(err){
    next(err);
  }
}

function children(req,res,next){
  try{
    res.json({
      ok:true,
      items:network.children(req.params.id)
    });
  }catch(err){
    next(err);
  }
}

function parents(req,res,next){
  try{
    res.json({
      ok:true,
      items:network.parents(req.params.id)
    });
  }catch(err){
    next(err);
  }
}

module.exports={connect,children,parents};
