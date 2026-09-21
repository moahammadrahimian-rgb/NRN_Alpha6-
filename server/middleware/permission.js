const {hasPermission}=require("../services/permissionService");

function requirePermission(permission){
  return (req,res,next)=>{
    try{
      if(!req.user){
        return res.status(401).json({ok:false,error:"AUTH_REQUIRED"});
      }

      if(!hasPermission(req.user.id,permission)){
        return res.status(403).json({ok:false,error:"PERMISSION_DENIED"});
      }

      next();
    }catch(err){
      next(err);
    }
  };
}

module.exports={requirePermission};
