const orders=require("../services/orderService");

function create(req,res,next){
  try{
    res.status(201).json({
      ok:true,
      order:orders.create(req.user.id)
    });
  }catch(e){next(e);}
}

function get(req,res,next){
  try{
    const item=orders.get(Number(req.params.id),req.user.id);
    if(!item)return res.status(404).json({ok:false,error:"ORDER_NOT_FOUND"});
    res.json({ok:true,order:item});
  }catch(e){next(e);}
}

function list(req,res,next){
  try{res.json({ok:true,orders:orders.list(req.user.id)});}
  catch(e){next(e);}
}

module.exports={create,get,list};
