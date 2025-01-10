const errorHandler = (err, req, res, next)=>{
    console.log('Error senioooor '+ err)
    res.status(409).send('SUPUTAMADRE ABUELA')
}

module.exports = {
    errorHandler
}
