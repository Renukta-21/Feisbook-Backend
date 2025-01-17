const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/me', async(req,res, next)=>{
    const {email} = req.body
    
    const authorizationHeader = req.get('Authorization')
    if(authorizationHeader && authorizationHeader.startsWith('Bearer')){
        const token = authorizationHeader.split(' ')[1]
        if(!token) res.status(400).send({error:'Token not provided'})

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decodedToken)
        } catch (error) {
            next(error)
        }

    }else{
        res.status(400).send({error:'Authorization header missing or malformed'})
    }
    
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