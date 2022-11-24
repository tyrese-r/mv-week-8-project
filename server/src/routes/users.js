const express = require('express')

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
    res.send('Hello World!')
})

module.exports = {usersRouter}