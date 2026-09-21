const shipping=require("../services/shippingService");

function methods(req,res,next){
  try{res.json({ok:true,methods:shipping.methods()});}
  catch(e){next(e);}
}

function create(req,res,next){
  try{res.status(201).json(shipping.create(req.user.id,req.body));}
  catch(e){next(e);}
}

function list(req,res,next){
  try{res.json({ok:true,shipping:shipping.list(req.user.id)});}
  catch(e){next(e);}
}

module.exports={methods,create,list};
