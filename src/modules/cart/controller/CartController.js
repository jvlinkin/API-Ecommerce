const userModel = require('../../users/models/User')
const cartModel = require('../../cart/models/Cart')
const productModel = require ('../../products/models/Product')


class CartController {

    async createOrder(req,res){
        const {username} = req.params;
        const {products, address, payment} = req.body;

        try {
            const user = await userModel.findById({_id: username})
            if(!user){
                return res.status(400).json({message:'Usuário não cadastrado.'})        
            }

            if (Object.keys(req.body.products).length === 0) {
                return res.status(400).json({message:'Não há nenhum produto para comprar.'})
            }


            const createdCart = await cartModel.create({
                username,
                products,
                address,
                payment
            }).then(()=>{
                return res.status(200).json({message:'Pedido criado com sucesso.'})
            }).catch((erro)=>{
                console.log(erro)
                return res.status(400).json({message:'Ocorreu um erro ao salvar o pedido. Por favor, tente novamente.'})
            })
            


        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Ocorreu um erro inesperado. Tente novamente.'})
            
        }

        
    }

    async listOrders(req,res){
        const {user_id} = req.params

        const user = await userModel.findById({_id: user_id})

        if(!user){
            return res.status(400).json({message:'User não encontrado.'})
        }

        const orders = await cartModel.findOne({username: user_id})

        if(!orders){
            return res.status(400).json({message:'Não há nenhum pedido para este usuário.'})
        }

        return res.status(200).json({orders})

        
    }

    

}

module.exports = CartController