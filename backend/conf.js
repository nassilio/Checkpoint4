require("dotenv").config();

const mysql = require("mysql");

let CONFIG = {
  backendPort: process.env.BACKEND_PORT || "4000"
};

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "cloud_name",
  api_key: process.env.API_KEY || "api_key",
  api_secret: process.env.API_SECRET || "api_secret"
});

module.exports = {
  CONFIG,
  db,
  cloudinary
};
