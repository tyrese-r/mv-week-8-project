const express = require("express");
const db = require("../db/db");
const Questions = require("../Model/Questions.model");
const User = require("../Model/User.model");
const questionsRouter = express.Router();

// Filter questions by category, difficulty
questionsRouter.get("/", async (req, res) => {
  let chosenDifficulty = null;
  let chosenCategory = null;
  // Check for query parameters
  if (Object.keys(req.query).includes("category")) {
    // List of category ids that are allowed
    const allowedCategories = [
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
    ];

    // Check categories are valid
    const isValidCategory = allowedCategories.includes(req.query.category);

    if (isValidCategory) {
      chosenCategory = req.query.category;
    } else {
      res.statusCode = 400;
      res.send({ message: "Invalid category" });
      return;
    }
  }
  if (Object.keys(req.query).includes("difficulty")) {
    // List of category ids that are allowed
    const allowedDifficulties = ["easy", "medium", "hard"];

    // Check categories are valid
    const isValidDifficulty = allowedDifficulties.includes(
      req.query.difficulty
    );

    if (isValidDifficulty) {
      chosenDifficulty = req.query.difficulty;
    } else {
      res.statusCode = 400;
      res.send({ message: "Invalid difficulty" });
      return;
    }
  }

  // This is only sending example data for now
  res.send({
    chosen_category: chosenCategory,
    chosen_difficulty: chosenDifficulty,
    count: Questions.count({
      where: {
        category: chosenCategory,
        difficulty: chosenDifficulty,
      },
    }),
    question: Questions.findAll({
      where: {
        category: chosenCategory,
        difficulty: chosenDifficulty,
      },
    }),
  });
});

module.exports = { questionsRouter };
