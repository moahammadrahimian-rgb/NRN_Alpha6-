"use strict";

const fs=require("fs");
const path=require("path");

const checks=[
  ["app","server/app.js"],
  ["database","server/database/database.js"],
  ["init","server/database/init.js"],
  ["auth","server/services/authService.js"],
  ["neuron","server/services/neuronService.js"],
  ["network","server/services/networkService.js"],
  ["referral","server/services/referralService.js"],
  ["wallet","server/services/walletService.js"],
  ["reward","server/services/rewardService.js"],
  ["product","server/services/productService.js"],
  ["cart","server/services/cartService.js"],
  ["order","server/services/orderService.js"],
  ["payment","server/services/paymentService.js"],
  ["shipping","server/services/shippingService.js"],
  ["ads","server/services/adService.js"],
  ["notification","server/services/notificationService.js"],
  ["help","server/services/helpService.js"],
  ["reports","server/services/reportService.js"],
  ["settings","server/services/settingsService.js"]
];

let passed=0;

for(const [name,file] of checks){
  const full=path.join(process.cwd(),file);

  if(!fs.existsSync(full)){
    throw new Error("FILE_MISSING_"+name);
  }

  require(full);
  passed++;

  console.log("CHECK_"+name.toUpperCase()+"=OK");
}

console.log("---------------------------------");
console.log("INTEGRATION_FILES="+passed);
console.log("INTEGRATION_BASE=OK");
console.log("---------------------------------");
