const router=require("express").Router();
const {requireAuth}=require("../middleware/auth");
const c=require("../controllers/productController");

router.get("/",c.list);
router.get("/:id",c.get);
router.post("/",requireAuth,c.create);

module.exports=router;
