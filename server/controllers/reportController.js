const reports=require("../services/reportService");

function create(req,res,next){
  try{
    res.status(201).json(reports.create(req.user.id,req.body));
  }catch(e){next(e);}
}

module.exports={create};
