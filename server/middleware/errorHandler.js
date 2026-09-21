"use strict";

module.exports = (err, req, res, next) => {
  console.error("=================================");
  console.error("ALPHA-6 ERROR");
  console.error("METHOD:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("MESSAGE:", err && err.message);
  console.error("STACK:", err && err.stack);
  console.error("=================================");

  if (res.headersSent) {
    return next(err);
  }

  const status = Number(err && err.status) || 500;

  res.status(status).json({
    ok: false,
    error: err && err.message ? err.message : "INTERNAL_ERROR",
    requestId: req.requestId || null
  });
};
