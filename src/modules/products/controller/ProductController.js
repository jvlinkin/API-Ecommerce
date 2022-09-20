const productModel = require('../models/Product')
const userModel = require('../../users/models/User');
const { json } = require('express');

class ProductController {

    async create(req,res){
        const {id} = req.params;
        const {productName,productDescription, productPrice, productQuantity, productImage } = req.body

        const user = await userModel.findOne({_id: id});

        if(!user){
            return res.status(400).json({message:'Usuário não encontrado no sistema'})
        }

        const productAlreadyExists = await productModel.findOne({productName})

        if(productAlreadyExists){
            return res.status(400).json({message:'Já existe um produto cadastrado com esse mesmo nome.'})
        }

        if(user.isAdmin == false){
            return res.status(400).json({message:'Esse perfil não tem a permissão de administrador para realizar esse tipo de ação.'})
        }

        const productData = new productModel({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            productImage
        })

        await productData.save().then(()=>{
            return res.status(201).json({message:'Produto cadastrado com sucesso!', productData})
        }).catch((erro)=>{
            console.log('Falha ao cadastrar o produto.', erro)
            return res.status(500).json({message:'Falha ao cadastrar produto. Tente novamente.'})
        })
    }


}

module.exports = ProductController