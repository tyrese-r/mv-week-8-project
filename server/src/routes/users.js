const express = require('express')
const { User, Questions } = require('../Model')

const usersRouter = express.Router()

// Get all users
usersRouter.get('/', async (req, res) => {
    const users = await User.findAll()
    const usersJSON = users.map(u => u.toJSON())
    res.send(usersJSON)
})

// Create a new user
usersRouter.post('/', async (req, res) => {
    // Get username from body
    if (!Object.keys(req.body).includes('username')) {
        // Must contain username
        res.statusCode = 400
        return res.send({ message: 'Body must contain username' })
    }
    const username = req.body.username
    const user = await User.findByPk(username)
    // Check for duplicate
    if (user != null) {
        res.statusCode = 400
        res.send({ message: 'User with username already exists' })
        return
    }

    const newUser = await User.create({
        username: username
    })
    res.send({
        user: newUser
    })
})

// Get a single user by id
usersRouter.get('/:username', async (req, res) => {
    const username = req.params.username
    // Search for users
    const user = await User.findByPk(username)
    if (user == null) {
        res.statusCode = 404
        return res.send({ message: 'User not found' })
    }
    res.send(user.toJSON())
})

// Update a single user
usersRouter.put('/:username', async (req, res) => {
    // CHeck that the body contains score
    if (!Object.keys(req.body).includes('score')) {
        res.statusCode = 400
        // If it doesn't
        return res.send({ message: 'Body must contain score' })
    }

    // Get user
    const username = req.params.username
    const user = await User.findByPk(username)
    if (user == null) {
        res.statusCode = 404
        return res.send({ message: 'User not found' })
    }
    // Update the highest score
    const newScore = parseInt(req.body.score)

    // If score is not greater than 0 then send error
    if(!(newScore >= 0)) {
        res.statusCode = 400
        res.send({message: 'Invalid score value'})
        return
    }

    user.highestScore = Math.max(req.body.score, user.highestScore)

    user.save()

    if(user.highestScore == newScore) {
        // do something score was updated
        
    }else {
        // do something score wasn't updated
        
    }

    return res.send(user)

    //  Get
    
})

module.exports = { usersRouter }

/*



*/