import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import configJson from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

const config = configJson[env];

console.log("using environment: ", env);
// console.log(config);

const db = {};

const options = {
  dialect: "postgres",
  ssl: true,
  dialectOptions: { ssl: { require: true } },
  logging: console.log
};

let sequelize = new Sequelize(config.use_env_variable, options);

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
