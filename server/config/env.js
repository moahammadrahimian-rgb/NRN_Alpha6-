require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "CHANGE_THIS_ALPHA6_SECRET",
  nodeEnv: process.env.NODE_ENV || "development"
};
