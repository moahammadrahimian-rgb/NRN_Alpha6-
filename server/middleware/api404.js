module.exports=(req,res,next)=>{
  if(req.path.startsWith("/api/")){
    return res.status(404).json({
      ok:false,
      error:"API_ROUTE_NOT_FOUND",
      path:req.path
    });
  }
  next();
};
