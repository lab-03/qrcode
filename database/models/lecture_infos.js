module.exports = (sequelize, DataTypes) => {
  const lecture_infos = sequelize.define(
    "lecture_infos",
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
  lecture_infos.associate = function(models) {
    // associations can be defined here
  };
  return lecture_infos;
};
