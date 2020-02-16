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
    username: "amr",
    password: "root",
    database: "qrcode_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
