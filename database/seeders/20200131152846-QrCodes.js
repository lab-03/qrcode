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
      let long = Math.floor(Math.random() * 100 + 1);
      let lat = Math.floor(Math.random() * 100 + 1);
      const qrCode = {
        hash,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(" + long + " " + lat + ")",
          4326
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      QrCodes.push(qrCode);
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
