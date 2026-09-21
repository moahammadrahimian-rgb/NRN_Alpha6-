"use strict";

const modules=require("./index");

let passed=0;

for(let n=451;n<=500;n++){
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

console.log("ALPHA6_MODULES_451_500="+passed);
console.log("MODULE_451="+modules.m451().module);
console.log("MODULE_500="+modules.m500().module);
console.log("BACKTEST-451-500-BASE=OK");
