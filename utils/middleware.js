const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'tests' && process.env.NODE_ENV !== 'test') {
        console.log('Error --------------------------------');
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
        console.log('Nuevo errror xdd ' + err)
    }

}

module.exports = {
    errorHandler
}
