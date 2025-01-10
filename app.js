const express = require('express')
const authRouter = require('./controllers/auth')
const { default: mongoose } = require('mongoose')
const config = require('./config')
const middleware = require('./utils/middleware')

const app = express()


mongoose.connect(config.mongoURI)
.then(()=> console.log(`DB connected on ${config.mongoURI}`))
.catch(err=> console.log('Error connecting to DB '+ err))

app.use(express.json())
app.use(authRouter)
app.use(middleware.errorHandler)

module.exports = app