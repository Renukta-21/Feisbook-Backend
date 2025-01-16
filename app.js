const express = require('express')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/users')
const { default: mongoose } = require('mongoose')
const config = require('./config')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.mongoURI)
.then(()=> console.log(`DB connected on ${config.mongoURI}`))
.catch(err=> console.log('Error connecting to DB '+ err))

app.use(express.json())
app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)
app.use(middleware.errorHandler)

module.exports = app