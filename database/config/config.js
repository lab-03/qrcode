require("dotenv").config();

module.exports = {
  development: {
    username: "amr",
    password: "root",
    database: "qrcode_dev",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "amr",
    password: "root",
    database: "qrcode_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "",
    password: "",
    // database: "qrcode_production",
    host: process.env.DATABASE_URL,
    ssl: true,
    dialect: "postgres"
  }
};
