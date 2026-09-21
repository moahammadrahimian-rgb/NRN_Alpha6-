const products=require("../services/productService");

function create(req,res,next){
  try{
    res.status(201).json({
      ok:true,
      product:products.create(req.user.id,req.body)
    });
  }catch(e){next(e);}
}

function get(req,res,next){
  try{
    const item=products.get(Number(req.params.id));
    if(!item)return res.status(404).json({ok:false,error:"PRODUCT_NOT_FOUND"});
    res.json({ok:true,product:item});
  }catch(e){next(e);}
}

function list(req,res,next){
  try{
    res.json({ok:true,products:products.list()});
  }catch(e){next(e);}
}

module.exports={create,get,list};
