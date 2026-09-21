const router=require("express").Router();
const system=require("../config/system");

router.get("/info",(req,res)=>{
  res.json({
    ok:true,
    project:system.project,
    version:system.version,
    currency:system.currency,
    testPayment:system.testPayment,
    externalApis:system.externalApis
  });
});

module.exports=router;
