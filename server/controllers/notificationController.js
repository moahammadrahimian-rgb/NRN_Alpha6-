const notification=require("../services/notificationService");

function list(req,res,next){
  try{
    res.json({
      ok:true,
      notifications:notification.list(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

function read(req,res,next){
  try{
    notification.read(
      req.user.id,
      Number(req.params.id)
    );

    res.json({
      ok:true,
      message:"NOTIFICATION_READ"
    });
  }catch(err){
    next(err);
  }
}

module.exports={list,read};
