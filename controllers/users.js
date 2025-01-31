const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')

usersRouter.get('/',  async (req, res) => {
    const user = req.user
    const userList = await User.find({})

    res.status(200).send(userList)
})

usersRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return res.status(404).send({ error: 'User not found' })

    res.status(200).send(user)
})

module.exports = usersRouter