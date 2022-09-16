const {Router} = require('express')
const productsRoutes = Router()

productsRoutes.get('/',(req,res)=>{
    res.json({message:'Chamar o método da controller'})
})







module.exports = productsRoutes