module.exports = (sequelize, DataTypes) => {
  const qrcodes = sequelize.define(
    "qrcodes",
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
  qrcodes.associate = function(models) {
    // associations can be defined here
  };
  return qrcodes;
};
