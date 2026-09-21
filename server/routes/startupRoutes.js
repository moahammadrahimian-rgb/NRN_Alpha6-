const router=require("express").Router();
const check=require("../utils/startupCheck");

router.get("/",(req,res)=>{
  const result=check.check();
  res.status(result.ok?200:500).json(result);
});

module.exports=router;
