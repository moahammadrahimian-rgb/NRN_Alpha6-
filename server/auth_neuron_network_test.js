"use strict";

const http = require("http");

const BASE = "http://127.0.0.1:3000";
const email = `alpha6_flow_${Date.now()}@example.com`;
const password = "Alpha6Test@123";

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);

    const data = body ? JSON.stringify(body) : null;

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    const req = http.request(options, res => {
      let raw = "";

      res.on("data", chunk => {
        raw += chunk;
      });

      res.on("end", () => {
        let json = null;

        try {
          json = JSON.parse(raw);
        } catch (_) {}

        resolve({
          status: res.statusCode,
          body: json,
          raw
        });
      });
    });

    req.on("error", reject);

    if (data) req.write(data);

    req.end();
  });
}

function ok(condition, name) {
  if (!condition) {
    throw new Error(name);
  }

  console.log(`✔ ${name}`);
}

(async () => {
  console.log("=========================================");
  console.log("ALPHA-6 AUTH → NEURON → NETWORK TEST");
  console.log("=========================================");

  try {
    const register = await request(
      "POST",
      "/api/auth/register",
      {
        username: `alpha6_flow_${Date.now()}`,
        email,
        password
      }
    );

    ok(
      register.status === 201 && register.body && register.body.ok === true,
      "AUTH / REGISTER"
    );

    const login = await request(
      "POST",
      "/api/auth/login",
      {
        email,
        password
      }
    );

    ok(
      login.status === 200 &&
      login.body &&
      login.body.ok === true &&
      typeof login.body.token === "string",
      "AUTH / LOGIN + JWT"
    );

    const token = login.body.token;

    const neuron = await request(
      "GET",
      "/api/neurons",
      null,
      token
    );

    ok(
      neuron.status !== 401,
      "NEURON / AUTHENTICATED ROUTE"
    );

    const network = await request(
      "GET",
      "/api/network/1/children",
      null,
      token
    );

    ok(
      network.status !== 401,
      "NETWORK / AUTHENTICATED ROUTE"
    );

    console.log("=========================================");
    console.log("AUTH = سالم");
    console.log("JWT = سالم");
    console.log("NEURON = سالم");
    console.log("NETWORK = سالم");
    console.log("=========================================");
    console.log("INTEGRATION TEST = سالم");
    console.log("=========================================");

  } catch (err) {
    console.error("=========================================");
    console.error("INTEGRATION TEST = خراب");
    console.error("ERROR:", err.message);
    console.error("=========================================");
    process.exitCode = 1;
  }
})();
