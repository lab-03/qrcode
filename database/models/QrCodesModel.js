module.exports = (sequelize, DataTypes) => {
  const QrCodes = sequelize.define(
    "QrCodes",
    {
      location: {
        type: DataTypes.GEOMETRY("POINT", 4326),
        allowNull: false
      },
      instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  QrCodes.associate = function(models) {
    // associations can be defined here
  };
  return QrCodes;
};
