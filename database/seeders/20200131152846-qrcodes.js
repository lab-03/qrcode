"use strict";

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
    let point1 = { type: "Point", coordinates: [39.807222, -76.984722] };
    let point2 = { type: "Point", coordinates: [10.077905, -11.548469] };
    return queryInterface.bulkInsert(
      "qrcodes",
      [
        {
          instructor_id: "5",
          course_id: "123",
          location: "((39.807222, -76.984722),4326)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instructor_id: "65",
          course_id: "324",
          location: "((10.077905, -11.548469),4326))",
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
    return queryInterface.bulkDelete("qrcodes", null, {});
  }
};
