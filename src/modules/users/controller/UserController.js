const userModel = require('../models/User')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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

    async forgotPassword(req,res){

        const {email} = req.body;

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({message:'Não foi encontrado nenhum usuário com esse e-mail cadastrado no sistema.'})
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours()+1);

        await userModel.findByIdAndUpdate(user.id,{
          '$set':{
            passwordResetToken: token,
            passwordResetExpires: now
          }
        })



        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });

          const info = await transport.sendMail({
            from: 'api-ecommerce.com.br', 
            to: email,
            subject: "Forgot password",
            text: "Hello world?",
            html: `<h2> Hi ${user.name}! </h2> <br> <h3>Need to reset your password? No problem,
            use your secret code:</h3><br>
            <p>${token}</p> <br>
            <p>This token expires within 1 hour.</p>
            <br><br>

            <p>Equipe API</p>
            <p>api-ecommerce.com.br</p><br>`,
          }).then(()=>{
            return res.status(250).json({message:'Email enviado com sucesso. Verique sua caixa de entrada.'})
          }).catch((err)=>{
            console.log('Erro eo enviar e-mail:',err)
            return res.status(502).json({message:'Falha ao enviar e-mail de recuperação de senha. Tente novamente.'})
          });



    }

    async resetPassword(req,res){
      const {token} = req.params
      const {email, password} = req.body;

        const user = await userModel.findOne({email})
        .select('+passwordResetToken passwordResetExpires')

        if(!user){
            return res.status(400).json({message:'Email/token estão incorretos. Por favor, tente novamente.'});
        }

        if(token != user.passwordResetToken){
          return res.status(400).json({message:'Email/token estão incorretos. Por favor, tente novamente.'});
        }

        const nowDate = new Date();

        if(nowDate > user.passwordResetExpires){            
          return res.status(400).json({message:'Email/token estão incorretos. Por favor, tente novamente.'});
        }

        const salt = await bcrypt.genSalt(15)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword;
        await user.save();
        return res.json({message: 'Password successfully changed'});


    }

    async login(req,res){

    }

    



    
}

module.exports = UserController