const {getDB}=require("../database/database");

async function health(req,res){
  await getDB();
  res.json({
    ok:true,
    app:"NEURON ALPHA-6",
    status:"online",
    database:"ready",
    time:new Date().toISOString()
  });
}

async function info(req,res){
  res.json({
    ok:true,
    name:"NEURON ALPHA-6",
    version:"0.92",
    platform:"TERMUX / ANDROID"
  });
}

module.exports={health,info};
