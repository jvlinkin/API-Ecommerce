const {Router} = require('express')
const usersRoutes = Router()

usersRoutes.get('/',(req,res)=>{
    res.json({message:'Chamar o método da controller.'})
})





module.exports = usersRoutes