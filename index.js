const express = require('express')
const PORT = 3001

const app = express()

app.get('/api', (req, res) => {
    res.send('API')
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))