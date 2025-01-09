const express = require('express')
const authRouter = require('./controllers/auth')
const { default: mongoose } = require('mongoose')

const CONNECTION_STRING = 'mongodb://localhost:27017'

const app = express()

mongoose.connect(CONNECTION_STRING)
.then(()=> console.log('Joya'))
.catch(err=> console.log(err))

app.use(authRouter)

module.exports = app