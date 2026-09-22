const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const { getDB, saveDB } = require("../database/database");

router.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const db = await getDB();

    const result = db.exec(`
      SELECT id, status, reason, updated_by, updated_at
      FROM site_control
      WHERE id = 1
    `);

    const row = result[0]?.values[0];

    if (!row) {
      return res.status(500).json({
        ok: false,
        error: "SITE_CONTROL_NOT_FOUND"
      });
    }

    return res.json({
      ok: true,
      site: {
        id: row[0],
        status: row[1],
        reason: row[2],
        updatedBy: row[3],
        updatedAt: row[4]
      }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "SITE_CONTROL_READ_FAILED"
    });
  }
});

router.post("/lock", requireAuth, requireAdmin, async (req, res) => {
  try {
    const db = await getDB();
    const reason = String(req.body?.reason || "MANUAL_LOCK").slice(0, 500);
    const userId = req.user?.id || null;

    db.run(`
      UPDATE site_control
      SET status = 'LOCKED',
          reason = ?,
          updated_by = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [reason, userId]);

    saveDB();

    return res.json({
      ok: true,
      status: "LOCKED"
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "SITE_LOCK_FAILED"
    });
  }
});

router.post("/unlock", requireAuth, requireAdmin, async (req, res) => {
  try {
    const db = await getDB();
    const userId = req.user?.id || null;

    db.run(`
      UPDATE site_control
      SET status = 'ONLINE',
          reason = '',
          updated_by = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [userId]);

    saveDB();

    return res.json({
      ok: true,
      status: "ONLINE"
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "SITE_UNLOCK_FAILED"
    });
  }
});

module.exports = router;
