module.exports = function requireAdmin(req,res,next) {
  if (!req.user || !["owner","admin"].includes(req.user.role)) {
    return res.status(403).json({
      ok:false,
      error:"ADMIN_ONLY"
    });
  }

  next();
};
