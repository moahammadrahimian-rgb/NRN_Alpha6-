const crypto=require("crypto");

function hashToken(token){
  return crypto
    .createHash("sha256")
    .update(String(token))
    .digest("hex");
}

function randomToken(){
  return crypto.randomBytes(48).toString("hex");
}

module.exports={hashToken,randomToken};
