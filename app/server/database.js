"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
const { syncBuiltinESMExports } = require("module");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    host: "dpg-cnp6960l5elc73cl7td0-a",
    user: "budgetdb_bkqh_user",
    port: 5432,
    password: process.env.PASS,
    database: process.env.DB
  });
} else {
  db = new Client({
    database: "budgetDB_test"
  });
}


try{
  console.log(db)
  db.connect();

}catch(e){
  console.log(e)
  db.end()
}

module.exports = db;