const express=require("express");
const auth=require("../middleware/auth");
const c=require("../controllers/referralCodeController");
const router=express.Router();

router.post("/create",auth,c.create);
router.get("/:code",c.find);

module.exports=router;
