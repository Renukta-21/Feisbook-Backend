const User = require('../models/user')
const { deleteImage } = require('../utils/cloudinary')
const meRouter = require('express').Router()

meRouter.get('/', async (req, res) => {
    const user = req.user
    res.status(200).send(user)
})

meRouter.delete('/', async (req, res) => {
    const user = req.user
    await User.findByIdAndDelete(user._id)

    if(user.images.profile.public_id){
        await deleteImage(user.images.profile.public_id)
    }

    res.status(200).send({
        "message": "User successfully deleted"
    })
})

meRouter.put('/', async (req, res) => {
    const user = req.user
    const { email, ...allowedUpdates } = req.body
    const updatedUser = await User.findByIdAndUpdate(user._id, allowedUpdates, {
        new: true,
        runValidators: true
    })

    res.status(200).send(updatedUser)
})
module.exports = meRouter