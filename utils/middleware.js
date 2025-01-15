const errorHandler = (err, req, res, next)=>{
    console.log('Error --------------------------------')
    if(err.code === 11000){
        const [[, value]] = Object.entries(err.keyValue)
        res.status(409).send({error:`${value} has an existing account`})
    }else if(err.name === 'ValidationError') {
        console.log(err.message)
        res.status(400).send({error:err.message})
    }else{
        console.log('Nuevo errror xdd '+ err.name)
    }
}

module.exports = {
    errorHandler
}
