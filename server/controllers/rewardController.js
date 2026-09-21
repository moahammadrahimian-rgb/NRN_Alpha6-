const reward=require("../services/rewardService");

function history(req,res,next){
  try{
    res.json({
      ok:true,
      rewards:reward.history(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

module.exports={history};
