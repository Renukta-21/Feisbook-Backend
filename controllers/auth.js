const User = require('../models/user')
const authRouter = require('express').Router()

authRouter.post('/api/auth/signup', (req, res) => {
    console.log(req.body)
    res.send('API')
})

authRouter.post('/api/auth/login')

module.exports = authRouter