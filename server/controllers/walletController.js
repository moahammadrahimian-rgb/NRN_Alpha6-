const wallet=require("../services/walletService");

function get(req,res,next){
  try{
    res.json({
      ok:true,
      wallet:wallet.get(req.user.id)
    });
  }catch(err){
    next(err);
  }
}

module.exports={get};
