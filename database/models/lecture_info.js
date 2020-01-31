"use strict";
module.exports = (sequelize, DataTypes) => {
  const lecture_info = sequelize.define(
    "lecture_info",
    {
      location: {
        type: DataTypes.GEOMETRY("POINT", 4326),
        allowNull: false
      },
      instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  lecture_info.associate = function(models) {
    // associations can be defined here
  };
  return lecture_info;
};
