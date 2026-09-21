const crypto=require("crypto");

function createDeviceId(input=""){
  return crypto
    .createHash("sha256")
    .update(String(input))
    .digest("hex");
}

module.exports={createDeviceId};
