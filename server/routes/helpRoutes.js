const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/helpController");

router.use(requireAuth);
router.get("/",c.list);
router.post("/",c.create);

module.exports=router;
