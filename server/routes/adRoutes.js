const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/adController");

router.get("/",c.active);
router.post("/",requireAuth,c.create);

module.exports=router;
