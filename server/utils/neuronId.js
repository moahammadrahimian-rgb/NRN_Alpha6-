const crypto=require("crypto");

function createNeuronId(){
  return "NRN-"+crypto
    .randomBytes(8)
    .toString("hex")
    .toUpperCase();
}

module.exports={createNeuronId};
