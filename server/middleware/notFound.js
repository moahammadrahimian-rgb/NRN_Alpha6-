module.exports=function(req,res,next){
  if(req.path.startsWith("/api/"))
    return res.status(404).json({ok:false,error:"API پیدا نشد"});
  next();
};
