const express = require('express')
const authRouter = require('./controllers/auth')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const app = express()


mongoose.connect(process.env.MONGO_URI_TEST)
.then(()=> console.log(`DB connected on `))
.catch(err=> console.log('Error connecting to DB '+ err))

app.use(authRouter)

module.exports = app