const router=require("express").Router();
const {getDB}=require("../database/database");

router.get("/db",(req,res)=>{
  try{
    const db=getDB();
    const r=db.exec(`
      SELECT COUNT(*)
      FROM sqlite_master
      WHERE type='table'
    `);

    res.json({
      ok:true,
      database:"ready",
      tables:Number(r[0].values[0][0])
    });
  }catch(e){
    res.status(500).json({
      ok:false,
      database:"error",
      error:e.message
    });
  }
});

module.exports=router;
