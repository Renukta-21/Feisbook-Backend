const express = require('express')
const authRouter = require('./controllers/auth')

const app = express()

app.use(authRouter)

module.exports = app