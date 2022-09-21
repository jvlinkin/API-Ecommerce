const jwt = require('jsonwebtoken')
const authjwt = require('../config/authjwt/authjwt')
const userModel = require('../modules/users/models/User')

function isAuthenticated (req,res,next){
    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(400).json({message:'Usuário não autenticado.'})
    }
    
    const[,token] = authHeader.split(' ')
    const secret = authjwt.jwt.secret

    try {
        const {user_id} = req.params
        
        jwt.verify(token, secret, async function(err) {
            if(err){
                console.log(err)
                return res.status(400).json({message:'Token expirou/inválido.'})
            }
            
            const user = await userModel.findById({_id: user_id})
            .select('+accessToken accessTokenExpires')   
            
            if(!user){
                return res.status(400).json({message:'Usuário não encontrado no sistema.'})
            }

            const now = new Date();
            if(token != user.accessToken || now > user.accessTokenExpires){ 
                return res.status(400).json({message:'Token incorreto, ou inválido. Tente novamente'})
            }


            
            return next();

        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Não foi possível acessa rota no momento. Tente novamente.'})
        
    }
}

module.exports = isAuthenticated