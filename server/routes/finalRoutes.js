const express = require("express");
const router = express.Router();

router.get("/health", (req,res) => {
  res.json({
    ok:true,
    project:"NEURON ALPHA-6",
    build:100,
    status:"running"
  });
});

router.get("/version", (req,res) => {
  res.json({
    project:"NEURON ALPHA-6",
    version:"1.0.0",
    build:100
  });
});

module.exports = router;
