const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Questions extends Model {}

Questions.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incorrect_answer1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incorrect_answer2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    incorrect_answer3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db }
);

module.exports = Questions;
