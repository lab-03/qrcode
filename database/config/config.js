require("dotenv").config();
const { env } = process;

module.exports = {
  development: {
    dialect: "postgres",
    url: env.DB_DEV_URL
  },
  test: {
    dialect: "postgres",
    url: env.DB_TEST_URL
  },
  production: {
    dialect: "postgres",
    url: env.DATABASE_URL
  }
};
