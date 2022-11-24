const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    highestScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize: db }
);

module.exports = User;
