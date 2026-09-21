"use strict";

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const requireAuth = function(req, res, next) {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      error: "AUTH_REQUIRED"
    });
  }

  const token = header.substring(7).trim();

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: "AUTH_REQUIRED"
    });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      error: "INVALID_TOKEN"
    });
  }
};

module.exports = { requireAuth };
