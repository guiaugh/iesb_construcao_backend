const express = require('express')
const app = express()
const port = 3000

const router = require('./routes/pessoas')

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log('Aplicação Rodando')
})