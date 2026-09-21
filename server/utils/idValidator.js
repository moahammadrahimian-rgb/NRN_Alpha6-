function integerId(value){
  const n=Number(value);
  if(!Number.isInteger(n)||n<=0){
    throw new Error("INVALID_ID");
  }
  return n;
}

module.exports={integerId};
