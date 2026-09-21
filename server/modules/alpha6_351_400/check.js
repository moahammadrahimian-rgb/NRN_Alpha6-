"use strict";

const alpha6 = require("./index");

const results = [];

for (let i = 351; i <= 400; i++) {
  const fn = alpha6["m" + i];

  if (typeof fn !== "function") {
    throw new Error("MODULE_" + i + "_MISSING");
  }

  const result = fn();

  if (!result || result.ok !== true || result.module !== i) {
    throw new Error("MODULE_" + i + "_FAILED");
  }

  results.push(i);
}

console.log("ALPHA6_MODULES_351_400=" + results.length);
console.log("MODULE_351=" + results[0]);
console.log("MODULE_400=" + results[results.length - 1]);
console.log("BACKTEST-351-400-BASE=OK");
