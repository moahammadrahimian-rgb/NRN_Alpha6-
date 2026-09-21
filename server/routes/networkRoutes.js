const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const controller=require("../controllers/networkController");
const treeController=require("../controllers/networkTreeController");

router.use(requireAuth);

router.post("/connect",controller.connect);
router.get("/:id/tree",treeController.get);
router.get("/:id/children",controller.children);
router.get("/:id/parents",controller.parents);

module.exports=router;
