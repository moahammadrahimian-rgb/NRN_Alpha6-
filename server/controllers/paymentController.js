const payments=require("../services/paymentService");

function test(req,res,next){
  try{
    const result=payments.createTest(
      req.user.id,
      Number(req.body.orderId),
      Number(req.body.amount)
    );

    res.json({ok:true,payment:result});
  }catch(e){next(e);}
}

function list(req,res,next){
  try{res.json({ok:true,payments:payments.list(req.user.id)});}
  catch(e){next(e);}
}

module.exports={test,list};
