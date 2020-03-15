require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: process.env.DB_DEV_URL
  },
  test: {
    use_env_variable: process.env.DB_TEST_URL
  },
  production: {
    use_env_variable: process.env.DATABASE_URL
  }
};
