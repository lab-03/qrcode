"use strict";
let crypto = require("crypto");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      
    */
    let QrCodes = [];
    for (let i = 0; i < 10; i++) {
      let hash = crypto.randomBytes(20).toString("hex");
      const precision = 10000; // 4 decimals
      // generate two random floating point numbers between (100, -100) up to 4 decimal places
      let long =
        Math.floor(
          Math.random() * (100 * precision + 100 * precision) - 100 * precision
        ) /
        (1 * precision);
      let lat =
        Math.floor(
          Math.random() * (100 * precision + 100 * precision) - 100 * precision
        ) /
        (1 * precision);
      const checkableQrCode = {
        hash,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(" + long + " " + lat + ")",
          4326
        ),
        applyChecks: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      hash = crypto.randomBytes(20).toString("hex");
      const nonCheckableQrCode = {
        hash,
        location: null,
        applyChecks: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      QrCodes.push(checkableQrCode);
      QrCodes.push(nonCheckableQrCode);
    }
    return queryInterface.bulkInsert("QrCodes", QrCodes, {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("QrCodes", null, {});
  }
};
