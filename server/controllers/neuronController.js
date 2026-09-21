const neuronService=require("../services/neuronService");

async function create(req,res,next){
  try{
    const neuron=neuronService.create(req.user.id);

    res.status(201).json({
      ok:true,
      neuron
    });
  }catch(err){
    next(err);
  }
}

async function list(req,res,next){
  try{
    res.json({
      ok:true,
      neurons:neuronService.listByUser(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

async function get(req,res,next){
  try{
    const neuron=neuronService.get(
      req.params.id,
      req.user.id
    );

    if(!neuron){
      return res.status(404).json({
        ok:false,
        error:"NEURON_NOT_FOUND"
      });
    }

    res.json({
      ok:true,
      neuron
    });
  }catch(err){
    next(err);
  }
}

module.exports={create,list,get};
