const auditService = require("../services/auditService");

module.exports = function audit(action) {
  return async (req,res,next) => {
    try {
      await auditService.log({
        actorUserId: req.user ? req.user.sub : null,
        action,
        targetType: req.params ? Object.keys(req.params)[0] || null : null,
        targetId: req.params ? Object.values(req.params)[0] || null : null,
        metadata: {
          method: req.method,
          path: req.path
        }
      });
    } catch (err) {
      console.error("AUDIT_ERROR",err);
    }

    next();
  };
};
