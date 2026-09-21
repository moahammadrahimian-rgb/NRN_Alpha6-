function requiredString(value,max=500){
  const x=String(value??"").trim();
  return x.length>0&&x.length<=max;
}

function positiveInteger(value){
  const n=Number(value);
  return Number.isInteger(n)&&n>0;
}

function validPhone(value){
  return /^[0-9+\-\s()]{7,20}$/.test(String(value||""));
}

module.exports={
  requiredString,
  positiveInteger,
  validPhone
};
