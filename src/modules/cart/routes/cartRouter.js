const {Router} = require('express')
const cartRouter = Router()

cartRouter.get('/',(req,res)=>{
    res.json({message:'Chama o método da controller'})
})







module.exports = cartRouter