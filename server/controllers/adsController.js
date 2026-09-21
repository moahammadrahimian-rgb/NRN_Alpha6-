const service=require("../services/adsService");

async function create(req,res){
 if(!req.body.title)
  return res.status(400).json({ok:false,error:"عنوان تبلیغ لازم است"});
 res.json({ok:true,ads:await service.create(req.body.title,req.body.content)});
}

async function list(req,res){
 res.json({ok:true,ads:await service.list()});
}

module.exports={create,list};
