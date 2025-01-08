const express = require('express')

const app = express()

app.get('/api', (req,res)=>{
    console.log('asasa')
    res.send('ok lets go')
})
app.listen(3001, () => console.log('bieeeen'))