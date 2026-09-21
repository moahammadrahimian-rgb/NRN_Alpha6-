const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/walletController");

router.use(requireAuth);

router.get("/",controller.get);

module.exports=router;
