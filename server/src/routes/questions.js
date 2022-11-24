const express = require('express')

const questionsRouter = express.Router()

questionsRouter.get('/', async (req, res) => {
    res.send('Hello World!')
})


module.exports = {questionsRouter}