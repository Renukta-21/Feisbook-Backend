const User = require('../models/user')
const authRouter = require('express').Router()
require('express-async-errors')
const bcrypt = require('bcrypt')

authRouter.post('/api/auth/signup', async (req, res) => {
    const { name, email, password, bio } = req.body
    if (!password || password.length < 8) {
        res.status(400).send({
            error: 'Password length must me at least 8 chars'
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, passwordHash, bio })
    await newUser.save()
    res.status(201).send('User created succesfully')
})

authRouter.post('/api/auth/login')

module.exports = authRouter