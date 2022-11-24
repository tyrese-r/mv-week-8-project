const express = require('express')

const questionsRouter = express.Router()

// Filter questions by category, difficulty
questionsRouter.get('/', async (req, res) => {

    let chosenDifficulty = null
    let chosenCategory = null
    // Check for query parameters
    if (Object.keys(req.query).includes('category')) {
        // List of category ids that are allowed
        const allowedCategories = [
            '9', '10', '11', '12', '13',
            '14', '15', '16', '17', '18',
            '19', '20', '21', '22', '23',
            '24', '25', '26', '27', '28',
            '29', '30', '31', '32'
        ]

        // Check categories are valid
        const isValidCategory = allowedCategories.includes(req.query.category)

        if (isValidCategory) {
            chosenCategory = req.query.category
        } else {
            res.statusCode = 400
            res.send({ message: 'Invalid category' })
            return
        }
    }
    if (Object.keys(req.query).includes('difficulty')) {
        // List of category ids that are allowed
        const allowedDifficulties = ['easy', 'medium', 'hard']

        // Check categories are valid
        const isValidDifficulty = allowedDifficulties.includes(req.query.difficulty)

        if (isValidDifficulty) {
            chosenDifficulty = req.query.difficulty
        } else {
            res.statusCode = 400
            res.send({ message: 'Invalid difficulty' })
            return
        }
    }


    // This is only sending example data for now
    res.send({
        chosen_category: chosenCategory,
        chosen_difficulty: chosenDifficulty,
        count: 3,
        results: [
            {
              "category": "Science: Computers",
              "type": "boolean",
              "difficulty": "medium",
              "question": "All program codes have to be compiled into an executable file in order to be run. This file can then be executed on any machine.",
              "correct_answer": "False",
              "incorrect_answers": [
                "True"
              ]
            },
            {
              "category": "Sports",
              "type": "multiple",
              "difficulty": "medium",
              "question": "The F1 season of 1994 is remembered for what tragic event?",
              "correct_answer": "Death of Ayrton Senna (San Marino)",
              "incorrect_answers": [
                "The Showdown (Australia)",
                "Verstappen on Fire (Germany)",
                "Schumacher&#039;s Ban (Britain)"
              ]
            },
            {
              "category": "Entertainment: Television",
              "type": "multiple",
              "difficulty": "medium",
              "question": "Which character does voice actress Tara Strong NOT voice?",
              "correct_answer": "Bubbles (2016)",
              "incorrect_answers": [
                "Twilight Sparkle",
                "Timmy Turner",
                "Harley Quinn"
              ]
            }
          ]
    })
})


module.exports = { questionsRouter }


// Request 3 questions from db

/*

{
    results: [
      {
        "category": "Science: Computers",
        "type": "boolean",
        "difficulty": "medium",
        "question": "All program codes have to be compiled into an executable file in order to be run. This file can then be executed on any machine.",
        "correct_answer": "False",
        "incorrect_answers": [
          "True"
        ]
      },
      {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "medium",
        "question": "The F1 season of 1994 is remembered for what tragic event?",
        "correct_answer": "Death of Ayrton Senna (San Marino)",
        "incorrect_answers": [
          "The Showdown (Australia)",
          "Verstappen on Fire (Germany)",
          "Schumacher&#039;s Ban (Britain)"
        ]
      },
      {
        "category": "Entertainment: Television",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Which character does voice actress Tara Strong NOT voice?",
        "correct_answer": "Bubbles (2016)",
        "incorrect_answers": [
          "Twilight Sparkle",
          "Timmy Turner",
          "Harley Quinn"
        ]
      }
    ]
  }

  */