function info(req,res){
  res.json({
    ok:true,
    device:{
      userAgent:req.headers["user-agent"]||"",
      ip:req.ip
    }
  });
}

module.exports={info};
