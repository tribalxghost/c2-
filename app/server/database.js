"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASS,
    database: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASS || "Christopher#0160",
    database: process.env.DATABASE_URL || `${getDatabaseUri()}`,
  });
}

db.connect();

module.exports = db;