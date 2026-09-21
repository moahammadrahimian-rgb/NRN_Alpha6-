const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/orderController");

router.use(requireAuth);
router.get("/",c.list);
router.post("/",c.create);
router.get("/:id",c.get);

module.exports=router;
