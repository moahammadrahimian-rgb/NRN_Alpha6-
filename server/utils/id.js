function neuronId(){
  return "NRN-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,8).toUpperCase();
}
module.exports={neuronId};
