const User = require('../models/user')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')

usersRouter.get('/me', async(req,res)=>{
    const {email} = req.body
    
    const authorizationHeader = req.get('Authorization')
    if(authorizationHeader && authorizationHeader.startsWith('Bearer')){
        const token = authorizationHeader.split(' ')[1]
        try {
            
        } catch (error) {
            console.log(error)
        }

    }else{
        res.status(400).send({error:'Authorization header missing or malformed'})
    }
    console.log(req.headers)
    const user = await User.findOne({email})
    

    if(!user) res.status(404).send({error:'User not found'})

    res.status(200).send({user})
})
usersRouter.get('/:id', async(req,res)=>{
    const {email} = req.body
    const user = await User.find({email})
    
    res.status(200).send({user})
})

module.exports = usersRouter