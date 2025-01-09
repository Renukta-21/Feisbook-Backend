const authRouter = require('express').Router()

authRouter.get('/api', (req, res) => {
    res.send('API')
})

module.exports = authRouter