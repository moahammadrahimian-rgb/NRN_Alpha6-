"use strict";

const { getDB, saveDB } = require("./database");

async function migrateNeuronCore() {
  const db = await getDB();

  db.run(`
    CREATE TABLE IF NOT EXISTS neuron_core (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      neuron_uid TEXT NOT NULL UNIQUE,
      owner_user_id INTEGER NOT NULL,
      price_toman INTEGER NOT NULL DEFAULT 10000,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL,
      activated_at TEXT,
      FOREIGN KEY(owner_user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_neuron_core_owner
    ON neuron_core(owner_user_id)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_neuron_core_status
    ON neuron_core(status)
  `);

  saveDB();

  console.log("NRN-ALPHA6 NEURON CORE = READY");
  console.log("NEURON PRICE = 10000 TOMAN");
  console.log("PAYMENT = NOT ACTIVATED");
}

migrateNeuronCore().catch(err => {
  console.error("NEURON CORE ERROR:", err);
  process.exit(1);
});
