"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const initDB = require("./database/init");
const { port } = require("./config/env");
const alpha6 = require("./alpha6");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

/* ---------- HEALTH ---------- */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, project: "NRN-ALPHA6", status: "running" });
});

/* ---------- MODULES API ---------- */
app.get("/api/modules/status", (req, res) => {
  const s = alpha6.status();
  res.json({
    ok: true,
    project: s.project,
    version: s.version,
    total: s.total,
    loaded: s.modules,
    missing: s.total - s.modules
  });
});

app.get("/api/modules/run/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json(alpha6.runModule(id));
});

app.get("/api/modules/run-all", (req, res) => {
  res.json(alpha6.runAll());
});

/* ---------- PUBLIC ---------- */
app.use(express.static(path.join(__dirname, "../public")));

/* ---------- SPA FALLBACK ---------- */
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ ok: false, error: "API_NOT_FOUND" });
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* ---------- ERROR ---------- */
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ ok: false, error: err.message });
});

/* ---------- START ---------- */
initDB()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log("========================================");
      console.log(" NRN-ALPHA6");
      console.log(" SERVER RUNNING");
      console.log(" http://127.0.0.1:" + port);
      console.log("========================================");
    });
  })
  .catch((err) => {
    console.error("DATABASE ERROR:", err);
    process.exit(1);
  });
