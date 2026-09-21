function ok(res,data={}){
  return res.json({
    ok:true,
    ...data
  });
}

function fail(res,status,error){
  return res.status(status).json({
    ok:false,
    error
  });
}

module.exports={ok,fail};
