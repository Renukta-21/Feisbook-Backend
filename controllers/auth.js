const authRouter = require('express').Router()

authRouter.post('/api/auth/signup', (req, res) => {
    res.send('API')
})

authRouter.post('/api/auth/login')

module.exports = authRouter