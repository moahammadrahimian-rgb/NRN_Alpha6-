const cart=require("../services/cartService");

function add(req,res,next){
  try{
    cart.add(req.user.id,Number(req.body.productId),req.body.quantity);
    res.json({ok:true,message:"CART_UPDATED",items:cart.list(req.user.id)});
  }catch(e){next(e);}
}

function list(req,res,next){
  try{res.json({ok:true,items:cart.list(req.user.id)});}
  catch(e){next(e);}
}

function clear(req,res,next){
  try{
    cart.clear(req.user.id);
    res.json({ok:true,message:"CART_CLEARED"});
  }catch(e){next(e);}
}

module.exports={add,list,clear};
