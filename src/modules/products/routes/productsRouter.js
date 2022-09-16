const {Router} = require('express')
const productsRoutes = Router()

productsRoutes.get('/',(req,res)=>{
    res.json({message:'Rota de products funcionando.'})
})







module.exports = productsRoutes