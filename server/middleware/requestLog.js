"use strict";

module.exports=function requestLog(req,res,next){
  const started=Date.now();

  res.on("finish",()=>{
    console.log(
      "[REQUEST]",
      req.method,
      req.originalUrl,
      res.statusCode,
      (Date.now()-started)+"ms"
    );
  });

  next();
};
