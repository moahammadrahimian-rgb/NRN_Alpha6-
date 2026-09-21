"use strict";

const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const accountService = require("../services/accountService");

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await accountService.getAccount(req.user.sub);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "USER_NOT_FOUND"
      });
    }

    return res.json({
      ok: true,
      user
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
