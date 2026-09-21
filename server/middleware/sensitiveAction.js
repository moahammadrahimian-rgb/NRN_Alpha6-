function sensitiveAction(req,res,next){
  if(req.method==="GET"){
    return next();
  }

  if(req.headers["x-confirm-sensitive"]!=="ALPHA6"){
    return res.status(403).json({
      ok:false,
      error:"SENSITIVE_ACTION_CONFIRMATION_REQUIRED"
    });
  }

  next();
}

module.exports=sensitiveAction;
