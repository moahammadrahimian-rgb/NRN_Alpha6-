"use strict";

const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const user = await authService.register({
      username: req.body.username || req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).json({
      ok: true,
      message: "ثبت نام موفقیت آمیز بود",
      user
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    res.json({
      ok: true,
      ...result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login
};
