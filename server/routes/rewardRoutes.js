const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/rewardController");

router.use(requireAuth);

router.get("/",controller.history);

module.exports=router;
