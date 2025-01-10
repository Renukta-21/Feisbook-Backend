const errorHandler = (err, req, res, next)=>{
    console.log('Error --------------------------------')
    if(err.code = 11000){
        const [[, value]] = Object.entries(err.keyValue)
        res.status(409).send({error:`${value} has an existing account`})
    }
}

module.exports = {
    errorHandler
}
