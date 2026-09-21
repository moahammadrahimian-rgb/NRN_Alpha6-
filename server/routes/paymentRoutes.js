const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/paymentController");

router.use(requireAuth);
router.get("/",c.list);
router.post("/test",c.test);

module.exports=router;
