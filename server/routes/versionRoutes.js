const router=require("express").Router();
const system=require("../config/system");

router.get("/",(req,res)=>{
  res.json({
    ok:true,
    project:system.project,
    version:system.version
  });
});

module.exports=router;
