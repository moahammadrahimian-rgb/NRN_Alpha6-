const buckets = new Map();

module.exports = function rateLimit({
  windowMs = 60 * 1000,
  max = 60
} = {}) {
  return (req,res,next) => {
    const key =
      req.ip ||
      req.headers["x-forwarded-for"] ||
      "unknown";

    const now = Date.now();
    const current = buckets.get(key);

    if (!current || now - current.start >= windowMs) {
      buckets.set(key,{start:now,count:1});
      return next();
    }

    current.count++;

    if (current.count > max) {
      return res.status(429).json({
        ok:false,
        error:"RATE_LIMITED"
      });
    }

    next();
  };
};
