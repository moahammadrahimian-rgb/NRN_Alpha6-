const service=require("../services/referralCodeService");

async function create(req,res){
 try{
  const code=await service.create(req.user.id);
  res.json({ok:true,code});
 }catch(e){
  res.status(400).json({ok:false,error:e.message});
 }
}

async function find(req,res){
 const item=await service.find(req.params.code);
 if(!item)return res.status(404).json({ok:false,error:"کد پیدا نشد"});
 res.json({ok:true,item});
}

module.exports={create,find};
