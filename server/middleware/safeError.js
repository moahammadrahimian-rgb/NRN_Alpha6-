module.exports=(err,req,res,next)=>{
  console.error("ALPHA6_ERROR:",err.message);

  if(res.headersSent)return next(err);

  const status=
    err.statusCode||
    (err.message==="AUTH_REQUIRED"?401:500);

  res.status(status).json({
    ok:false,
    error:err.message||"INTERNAL_ERROR"
  });
};
