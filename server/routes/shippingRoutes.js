const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/shippingController");

router.use(requireAuth);
router.get("/methods",c.methods);
router.get("/",c.list);
router.post("/",c.create);

module.exports=router;
