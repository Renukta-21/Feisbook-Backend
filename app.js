const express = require('express')
const cors = require('cors')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/users')
const { default: mongoose } = require('mongoose')
const config = require('./config')
const middleware = require('./utils/middleware')
const docRouter = require('./controllers/docs')
const fileUpload = require('express-fileupload');

const app = express()

mongoose.connect(config.mongoURI)
.then(()=> console.log(`DB connected on ${config.mongoURI}`))
.catch(err=> console.log('Error connecting to DB '+ err))

app.use(fileUpload({
    useTempFiles: true, 
    tempFileDir: './uploads/',
}));
app.use(cors())
app.use(express.json())
app.use('/api/', docRouter)
app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)
app.use(middleware.errorHandler)

module.exports = app