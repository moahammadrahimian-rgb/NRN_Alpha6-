const express=require("express");
const c=require("../controllers/deviceController");
const router=express.Router();

router.get("/",c.info);

module.exports=router;
