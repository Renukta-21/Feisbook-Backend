const User = require('../models/user')
const authRouter = require('express').Router()
require('express-async-errors')
const bcrypt = require('bcrypt')

authRouter.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, bio } = req.body
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, password, bio })
    await newUser.save()
    res.status(201).send('User created succesfully')
})

authRouter.post('/api/auth/login') 

module.exports = authRouter