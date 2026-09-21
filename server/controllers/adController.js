const ads=require("../services/adService");

function create(req,res,next){
  try{
    res.status(201).json(ads.create(req.user.id,req.body));
  }catch(e){next(e);}
}

function active(req,res,next){
  try{res.json({ok:true,ads:ads.active()});}
  catch(e){next(e);}
}

module.exports={create,active};
