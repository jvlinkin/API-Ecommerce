const userModel = require('../models/User')
const bcrypt = require('bcrypt');

class UserController {

    async create (req,res){
        const {name,age,cellphone,email,password,username} = req.body;

        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({message:'Usuário já existe.'})
        }

        const salt = await bcrypt.genSalt(15)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = new userModel({
            name,
            age,
            cellphone,
            email,
            username,
            password: hashedPassword
        })

        await userData.save().then(()=>{
            return res.json({message:'Usuário cadastrado com sucesso.'})
        }).catch((erro)=>{
            return res.status(500).json({message:'Ocorreu um erro inseperado ao cadastrar o usuário. Tente novamente.'})
        });
        
    }
}

module.exports = UserController