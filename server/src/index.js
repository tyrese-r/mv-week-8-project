const express = require('express')
const app = express()
const cors = require('cors')
const { usersRouter } = require('./routes/users')
const { questionsRouter } = require('./routes/questions')
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())


app.use('/users', usersRouter)
app.use('/questions', questionsRouter)

app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`)
})