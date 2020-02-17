import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "production";

const config = configJson[env];

console.log("using environment: ", env);

const db = {};

let sequelize;
if (config.environment === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
  // sequelize = new Sequelize(
  // process.env.DATABASE_NAME,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASS,
  // {
  //   host: process.env.DATABASE_URL,
  //   port: process.env.DATABASE_PORT,
  //   dialect: "postgres",
  //   dialectOption: {
  //     ssl: true,
  //     native: true
  //   },
  //   logging: true
  // }
  // config
  // );
} else {
  sequelize = new Sequelize(config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
