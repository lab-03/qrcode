module.exports = (sequelize, DataTypes) => {
  const QrCodes = sequelize.define(
    "QrCodes",
    {
      location: {
        type: DataTypes.GEOMETRY("POINT", 4326),
        allowNull: false
      },
      hash: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
