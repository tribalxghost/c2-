"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     host: "dpg-cnp6960l5elc73cl7td0-a",
//     user: "budgetdb_bkqh_user",
//     port: 5432,
//     password: process.env.PASS,
//     database: process.env.DB
//   });
// } else {
//   db = new Client({
//     host: "dpg-cnp6960l5elc73cl7td0-a",
//     user: "budgetdb_bkqh_user",
//     port: 5432,
//     password: process.env.PASS || "Christopher#0160",
//     database: process.env.DB 
//   });
// }


db = new Client(process.env.DATABASE_URL)
try{
  db.connect();

}catch(e){
  console.log(e)
}

module.exports = db;