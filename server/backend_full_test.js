"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE = "http://127.0.0.1:3000";
const E = Date.now();
const EMAIL = `alpha6_full_${E}@example.com`;
const PASSWORD = "Test@123456";
const USERNAME = `alpha6_full_${E}`;

function request(method, url, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);

    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }, res => {
      let data = "";

      res.on("data", chunk => data += chunk);

      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (_) {}

        resolve({
          status: res.statusCode,
          body: json,
          raw: data
        });
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

function ok(name) {
  console.log(`✓ سالم      ${name}`);
}

function fail(name, detail = "") {
  console.log(`× خراب      ${name}${detail ? " → " + detail : ""}`);
}

async function main() {
  console.log("========================================");
  console.log("ALPHA-6 BACKEND FULL TEST");
  console.log("========================================");

  let health;
  try {
    health = await request("GET", `${BASE}/api/health`);

    if (health.status === 200 && health.body && health.body.ok === true) {
      ok("SERVER / HEALTH");
    } else {
      fail("SERVER / HEALTH", `HTTP ${health.status}`);
    }
  } catch (err) {
    fail("SERVER / HEALTH", err.message);
    process.exitCode = 1;
    return;
  }

  let register;
  try {
    register = await request(
      "POST",
      `${BASE}/api/auth/register`,
      {
        username: USERNAME,
        email: EMAIL,
        password: PASSWORD
      }
    );

    if (
      register.status === 201 &&
      register.body &&
      register.body.ok === true &&
      register.body.user
    ) {
      ok("AUTH / REGISTER");
    } else {
      fail(
        "AUTH / REGISTER",
        register.body?.error || `HTTP ${register.status}`
      );
    }
  } catch (err) {
    fail("AUTH / REGISTER", err.message);
  }

  let login;
  try {
    login = await request(
      "POST",
      `${BASE}/api/auth/login`,
      {
        email: EMAIL,
        password: PASSWORD
      }
    );

    if (
      login.status === 200 &&
      login.body &&
      login.body.ok === true &&
      login.body.token
    ) {
      ok("AUTH / LOGIN");
      ok("AUTH / JWT");
    } else {
      fail(
        "AUTH / LOGIN",
        login.body?.error || `HTTP ${login.status}`
      );
    }
  } catch (err) {
    fail("AUTH / LOGIN", err.message);
  }

  const modules = [
    ["NEURON ROUTE", "routes/neuronRoutes.js"],
    ["NETWORK ROUTE", "routes/networkRoutes.js"],
    ["REFERRAL ROUTE", "routes/referralRoutes.js"],
    ["AUTH SERVICE", "services/authService.js"],
    ["USER SERVICE", "services/userService.js"],
    ["PRODUCT SERVICE", "services/productService.js"],
    ["CART SERVICE", "services/cartService.js"],
    ["ORDER SERVICE", "services/orderService.js"],
    ["PAYMENT SERVICE", "services/paymentService.js"],
    ["SHIPPING SERVICE", "services/shippingService.js"],
    ["ADS SERVICE", "services/adsService.js"],
    ["NOTIFICATION SERVICE", "services/notificationService.js"],
    ["HELP SERVICE", "services/helpService.js"],
    ["REPORT SERVICE", "services/reportService.js"],
    ["SETTINGS SERVICE", "services/settingsService.js"]
  ];

  for (const [name, relative] of modules) {
    const file = path.join(__dirname, relative);

    if (!fs.existsSync(file)) {
      fail(name, "FILE_MISSING");
      continue;
    }

    try {
      require(file);
      ok(name);
    } catch (err) {
      fail(name, err.message);
    }
  }

  console.log("========================================");
  console.log("BACKEND TEST FINISHED");
  console.log(`TEST_USER=${EMAIL}`);
  console.log("========================================");
}

main().catch(err => {
  console.error("FATAL_TEST_ERROR:", err);
  process.exitCode = 1;
});
