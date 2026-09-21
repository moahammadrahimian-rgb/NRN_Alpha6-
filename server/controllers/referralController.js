const referral=require("../services/referralService");

function create(req,res,next){
  try{
    const item=referral.create(
      req.user.id,
      Number(req.body.referredUserId)
    );

    res.status(201).json({
      ok:true,
      referral:item
    });
  }catch(err){
    next(err);
  }
}

function list(req,res,next){
  try{
    res.json({
      ok:true,
      referrals:referral.list(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

function myCode(req,res,next){
  try{
    res.json({
      ok:true,
      code:referral.createCode(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

module.exports={create,list,myCode};
