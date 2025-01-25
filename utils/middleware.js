const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = async(req,res,next) => {
    const authorizationHeader = req.get('Authorization')
    if(authorizationHeader && authorizationHeader.startsWith('Bearer')){
        const token = authorizationHeader.split(' ')[1]
        if(!token) return res.status(400).send({error:'Token not provided'})

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const userID = decodedToken.userID

            const user = await User.findById(userID)
            if(!user) return res.status(404).send({error:'User not found'})

            req.user = user
            next()
        } catch (error) {
            next(error)
        }

    }else{
        res.status(400).send({error:'Authorization header missing or malformed'})
    }
    
}

const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'tests' && process.env.NODE_ENV !== 'test') {
        console.log('Error --------------------------------' +err.message);
    }
    
    if (err.code === 11000) {
        const [[, value]] = Object.entries(err.keyValue)
        res.status(409).send({ error: `${value} has an existing account` })
    } else if (err.name === 'ValidationError') {
        res.status(400).send({ error: err.message })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(400).send({ error: 'Invalid web token' })
    }else if (err.name === 'CastError'){
        res.status(400).send({error:'Invalid ID format'})
    }
    else {
        console.log('Nuevo errror ' + err.message)
    }

}

module.exports = {
    errorHandler, tokenExtractor
}
