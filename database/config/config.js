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
    // username: "ipauyltryqxtzw",
    // password:
    //   "b0e3d0ac9f8d6d1d6881bfd27f6c64ee304b3672facda708186d422f0081396e",
    // database: process.env.DATABASE_URL,
    // host: "ec2-54-247-125-38.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    protocol: "postgres",
    dialectOption: {
      ssl: true
    }
  }
};
