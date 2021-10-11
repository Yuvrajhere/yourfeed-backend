const { createPool } = require("mysql");

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const pool = createPool({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectTimeout: 1000,
  connectionLimit: 15,
  queueLimit: 30,
  acquireTimeout: 1000,
});

module.exports = pool;
