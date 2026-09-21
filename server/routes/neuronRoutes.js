const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/neuronController");

router.use(requireAuth);

router.post("/",controller.create);
router.get("/",controller.list);
router.get("/:id",controller.get);

module.exports=router;
