"use strict";

const alpha6 = require("./index");

const results = [];

for (let i = 201; i <= 250; i++) {
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

console.log("ALPHA6_MODULES_201_250=" + results.length);
console.log("MODULE_201=" + results[0]);
console.log("MODULE_250=" + results[results.length - 1]);
console.log("BACKTEST-201-250-BASE=OK");
