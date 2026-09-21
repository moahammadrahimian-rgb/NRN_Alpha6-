"use strict";

const modules=require("./index");

let passed=0;

for(let n=501;n<=542;n++){
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

if(passed!==42){
  throw new Error("COUNT_FAILED");
}

console.log("ALPHA6_MODULES_501_542="+passed);
console.log("MODULE_501="+modules.m501().module);
console.log("MODULE_542="+modules.m542().module);
console.log("BACKTEST-501-542-BASE=OK");
