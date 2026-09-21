const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/notificationController");

router.use(requireAuth);

router.get("/",controller.list);
router.post("/:id/read",controller.read);

module.exports=router;
