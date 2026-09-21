module.exports = function validate(schema) {
  return (req,res,next) => {
    const body = req.body || {};

    for (const field of schema.required || []) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        String(body[field]).trim() === ""
      ) {
        return res.status(400).json({
          ok:false,
          error:"MISSING_FIELD",
          field
        });
      }
    }

    next();
  };
};
