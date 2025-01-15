const errorHandler = (err, req, res, next)=>{
    if(process.env.NODE_ENV !== 'test'){
        console.log('Error --------------------------------')
    }
    if(err.code === 11000){
        const [[, value]] = Object.entries(err.keyValue)
        res.status(409).send({error:`${value} has an existing account`})
    }else if(err.name === 'ValidationError') {
        res.status(400).send({error:err.message})
    }else{
        if(process.env.NODE_ENV !== 'test'){
            console.log('Nuevo errror xdd '+ err.name)
        }
    }
}

module.exports = {
    errorHandler
}
