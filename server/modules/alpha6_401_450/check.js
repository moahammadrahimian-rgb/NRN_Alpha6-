"use strict";

const modules=require("./index");

let passed=0;

for(let n=401;n<=450;n++){
  const fn=modules["m"+n];

  if(typeof fn!=="function"){
    throw new Error("MODULE_MISSING_"+n);
  }

  const result=fn();

  if(!result || result.ok!==true || result.module!==n){
    throw new Error("MODULE_FAILED_"+n);
  }

  passed++;
}

if(passed!==50){
  throw new Error("COUNT_FAILED");
}

console.log("ALPHA6_MODULES_401_450="+passed);
console.log("MODULE_401="+modules.m401().module);
console.log("MODULE_450="+modules.m450().module);
console.log("BACKTEST-401-450-BASE=OK");
