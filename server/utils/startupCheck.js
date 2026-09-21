const fs=require("fs");

function check(){
  const required=[
    "server/app.js",
    "server/database/database.js",
    "server/database/init.js",
    "server/services/authService.js",
    "server/services/neuronService.js",
    "server/services/productService.js",
    "server/services/orderService.js",
    "server/services/paymentService.js"
  ];

  const missing=required.filter(x=>!fs.existsSync(x));

  return {
    ok:missing.length===0,
    missing
  };
}

module.exports={check};
