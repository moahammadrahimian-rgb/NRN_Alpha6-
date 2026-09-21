const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const audit=require("../services/auditQueryService");

router.get("/",requireAuth,(req,res,next)=>{
  try{
    res.json({
      ok:true,
      activity:audit.userLogs(req.user.id)
    });
  }catch(e){next(e);}
});

module.exports=router;
