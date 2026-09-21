const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const sessions=require("../services/sessionService");

router.post("/logout",requireAuth,(req,res)=>{
  const header=req.headers.authorization||"";
  const token=header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  if(token) sessions.remove(token);

  res.json({
    ok:true,
    message:"LOGGED_OUT"
  });
});

module.exports=router;
