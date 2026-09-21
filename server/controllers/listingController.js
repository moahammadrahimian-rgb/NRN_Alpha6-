const service=require("../services/listingService");

async function create(req,res){
 if(!req.body.title)
  return res.status(400).json({ok:false,error:"عنوان لازم است"});
 await service.create(req.user.id,req.body.title,req.body.description);
 res.json({ok:true,message:"آگهی ثبت شد"});
}

async function list(req,res){
 res.json({ok:true,listings:await service.list()});
}

module.exports={create,list};
