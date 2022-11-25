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
    const allowedCategories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

    // Check categories are valid
    const isValidCategory = allowedCategories.map(c => c.name).includes(req.query.category);
    console.log(req.query.category)


    if (isValidCategory) {
      chosenCategory = allowedCategories.find(c => c.name == req.query.category).name;
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
    count: await Questions.count({
      where: {
        category: chosenCategory,
        difficulty: chosenDifficulty,
      },
    }),
    question: await Questions.findAll({
      where: {
        category: chosenCategory,
        difficulty: chosenDifficulty,
      },
    }),
  });
});

module.exports = { questionsRouter };
