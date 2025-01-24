const User = require('../models/user')
const meRouter = require('express').Router()

meRouter.get('/me', async (req, res) => {
    const user = req.user
    res.status(200).send(user)
})

meRouter.delete('/me', async (req, res) => {
    const user = req.user
    await User.findByIdAndDelete(user._id)

    res.status(200).send({
        "message": "User successfully deleted"
    })
})

meRouter.put('/me', async (req, res) => {
    const user = req.user
    const { email, ...allowedUpdates } = req.body
    const updatedUser = await User.findByIdAndUpdate(user._id, allowedUpdates, {
        new: true,
        runValidators: true
    })

    res.status(200).send(updatedUser)
})
module.exports = meRouter