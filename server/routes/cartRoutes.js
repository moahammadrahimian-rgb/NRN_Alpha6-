const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/cartController");

router.use(requireAuth);
router.get("/",c.list);
router.post("/",c.add);
router.delete("/",c.clear);

module.exports=router;
