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
    use_env_variable: process.env.DATABASE_URL,
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASS,
    // database: process.env.DATABASE_NAME,
    // host: process.env.DATABASE_HOST,
    dialect: "postgres",
    protocol: "postgres",
    dialectOption: {
      ssl: true
    }
  }
};
