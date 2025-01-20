const User = require('../models/user')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')

usersRouter.get('/me', async(req,res, next)=>{
    const {email} = req.body
    
    const authorizationHeader = req.get('Authorization')
    if(authorizationHeader && authorizationHeader.startsWith('Bearer')){
        const token = authorizationHeader.split(' ')[1]
        if(!token) res.status(400).send({error:'Token not provided'})

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const userID = decodedToken.userID

            const user = await User.findById(userID)
            if(!user) return res.status(404).send({error:'User not found'})

            /* req.user = user */
            res.status(200).send(user)
        } catch (error) {
            next(error)
        }

    }else{
        res.status(400).send({error:'Authorization header missing or malformed'})
    }
})
usersRouter.get('/:id', async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user) return res.status(404).send({error:'User not found'})
        
    res.status(200).send(user)
})

module.exports = usersRouter