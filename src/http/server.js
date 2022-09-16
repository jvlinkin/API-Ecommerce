require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const routes = require('./routes/routes')


app.use(express.json())
app.use(routes)

app.listen(PORT, async ()=>{
    await mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
        console.log('Conectado no banco de dados.')
    }).catch((err)=>{
        console.log('Falha ao se conectar no banco de dados.')
    });
    console.log(`Servidor rodando na porta ${PORT}.`)

})






