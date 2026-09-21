const express=require("express");
const auth=require("../middleware/auth");
const c=require("../controllers/adsController");
const router=express.Router();

router.get("/",c.list);
router.post("/",auth,c.create);

module.exports=router;
