const {Router} = require('express')
const usersRoutes = Router()

usersRoutes.get('/',(req,res)=>{
    res.json({message:'Rota de users funcionando.'})
})





module.exports = usersRoutes