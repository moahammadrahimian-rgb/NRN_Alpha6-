const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/referralController");

router.use(requireAuth);

router.get("/code",controller.myCode);
router.get("/",controller.list);
router.post("/",controller.create);

module.exports=router;
