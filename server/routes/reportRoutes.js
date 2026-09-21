const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/reportController");

router.use(requireAuth);
router.post("/",c.create);

module.exports=router;
