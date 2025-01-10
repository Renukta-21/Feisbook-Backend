const User = require('../models/user')
const authRouter = require('express').Router()
require('express-async-errors')

authRouter.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, bio } = req.body
    const newUser = new User({ name, email, password, bio })
    await newUser.save()
    res.status(201).send('User created succesfully')
})

authRouter.post('/api/auth/login') 

module.exports = authRouter