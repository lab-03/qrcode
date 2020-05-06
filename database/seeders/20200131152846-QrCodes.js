"use strict";
import crypto from "crypto";

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
    return queryInterface.bulkInsert(
      "QrCodes",
      [
        {
          hash: "AdSddcaskdoSOFIDANODJ",
          location: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(52.458415 16.904740)",
            4326
          ),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          hash: "ASfddcaskdodGsadasfsa",
          location: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(52.458415 16.904740)",
            4326
          ),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
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
