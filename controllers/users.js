const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/me', async(req,res)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    
    res.status(200).send({user})
})
usersRouter.get('/:id', async(req,res)=>{
    const {email} = req.body
    const user = await User.find({email})
    
    res.status(200).send({user})
})

module.exports = usersRouter