module.exports = function requireOwner(req,res,next) {
  if (!req.user || req.user.role !== "owner") {
    return res.status(403).json({
      ok:false,
      error:"OWNER_ONLY"
    });
  }

  next();
};
