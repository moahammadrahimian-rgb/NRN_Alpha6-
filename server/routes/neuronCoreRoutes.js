"use strict";

const router = require("express").Router();
const crypto = require("crypto");
const { requireAuth } = require("../middleware/auth");
const { getDB, saveDB } = require("../database/database");

router.use(requireAuth);

router.post("/create", async (req, res, next) => {
  try {
    const db = await getDB();
    const userId = Number(req.user.sub);

    const existing = db.exec(
      `SELECT id,neuron_uid,owner_user_id,price_toman,status,created_at,activated_at
       FROM neuron_core
       WHERE owner_user_id=?
       ORDER BY id ASC
       LIMIT 1`,
      [userId]
    );

    if (existing.length && existing[0].values.length) {
      const row = existing[0].values[0];

      return res.json({
        ok: true,
        created: false,
        neuron: {
          id: row[0],
          neuronUid: row[1],
          ownerUserId: row[2],
          priceToman: Number(row[3]),
          status: row[4],
          createdAt: row[5],
          activatedAt: row[6]
        }
      });
    }

    const neuronUid =
      "NRN-" +
      crypto.randomBytes(8).toString("hex").toUpperCase();

    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO neuron_core
       (neuron_uid,owner_user_id,price_toman,status,created_at)
       VALUES (?,?,?,?,?)`,
      [
        neuronUid,
        userId,
        10000,
        "pending",
        createdAt
      ]
    );

    saveDB();

    res.status(201).json({
      ok: true,
      created: true,
      neuron: {
        neuronUid,
        ownerUserId: userId,
        priceToman: 10000,
        status: "pending",
        createdAt
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const db = await getDB();
    const userId = Number(req.user.sub);

    const result = db.exec(
      `SELECT id,neuron_uid,owner_user_id,price_toman,status,created_at,activated_at
       FROM neuron_core
       WHERE owner_user_id=?
       ORDER BY id ASC
       LIMIT 1`,
      [userId]
    );

    if (!result.length || !result[0].values.length) {
      return res.json({
        ok: true,
        neuron: null
      });
    }

    const row = result[0].values[0];

    res.json({
      ok: true,
      neuron: {
        id: row[0],
        neuronUid: row[1],
        ownerUserId: row[2],
        priceToman: Number(row[3]),
        status: row[4],
        createdAt: row[5],
        activatedAt: row[6]
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
