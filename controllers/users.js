const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')

usersRouter.get('/me',middleware.tokenExtractor,  async(req,res)=>{
    const user = req.user
    res.status(200).send(user)
})
usersRouter.get('/:id', async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user) return res.status(404).send({error:'User not found'})
        
    res.status(200).send(user)
})

usersRouter.put('/:id', async(req,res)=>{
    const {id} = req.params
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new:true,
        runValidators:true
    })

    res.status(200).send(updatedUser)
})
module.exports = usersRouter