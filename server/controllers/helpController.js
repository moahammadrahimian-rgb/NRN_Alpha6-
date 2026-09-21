const help=require("../services/helpService");

function create(req,res,next){
  try{res.status(201).json(help.create(req.user.id,req.body));}
  catch(e){next(e);}
}

function list(req,res,next){
  try{res.json({ok:true,tickets:help.list(req.user.id)});}
  catch(e){next(e);}
}

module.exports={create,list};
