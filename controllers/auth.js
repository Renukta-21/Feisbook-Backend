const User = require('../models/user')
const authRouter = require('express').Router()
require('express-async-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authRouter.post('/signup', async (req, res) => {
    console.log(req.files)
    const { name, surname, email, password, bio } = req.body
    if (!password || password.length < 8) {
        return res.status(400).send({
            error: 'Password length must be at least 8 chars '
        }) 
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ name, surname, email, passwordHash, bio })
    await newUser.save()
    res.status(201).send(newUser)
})

authRouter.post('/login', async(req,res) => {
    const { password, name, email } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: 'Email or password not provided' }) 
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send({ error: 'User not found' }) 
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash) 
    if (!validPassword) {
        return res.status(401).send({ error: 'Incorrect password' }) 
    }

    const token = jwt.sign({
        userID: user._id
    }, process.env.JWT_SECRET_KEY)

    res.status(200).send({ token })
})

authRouter.post('/logout/', async (req, res) => {
    res.status(404).send({ error: 'Route not defined' })
})

module.exports = authRouter
