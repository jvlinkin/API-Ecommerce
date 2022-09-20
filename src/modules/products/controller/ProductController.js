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

    async deleteProduct(req,res){
        const {id, product_id} = req.params;

        const user = await userModel.findOne({_id: id});

        if(!user){
            return res.status(400).json({message:'Usuário não encontrado no sistema.'})
        }

        if(user.isAdmin == false){
            return res.status(400).json({message:'Esse perfil não tem a permissão de administrador para realizar esse tipo de ação.'})
        }

        const product = await productModel.findOne({_id:product_id})

        if(!product){
            return res.status(400).json({message:'Produto não encontrado.'})
        }
        await productModel.deleteOne({product}).then(()=>{
            return res.status(200).json({message:'Produto deletado com sucesso!.'})
        }).catch((erro)=>{
            console.log('Falha ao deletar o produto.', erro)
            return res.status(500).json({message:'Falha ao deletar produto. Tente novamente.'})
        })
    }

    async editProduct(req,res){
        const productData = req.body 
        const {id, product_id} = req.params;

        const user = await userModel.findOne({_id: id});

        if(!user){
            return res.status(400).json({message:'Usuário não encontrado no sistema'})
        }

        if(user.isAdmin == false){
            return res.status(400).json({message:'Esse perfil não tem a permissão de administrador para realizar esse tipo de ação.'})
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({message:'Naõ existe nenhum dado para atualizar.'})
        }

        const product = await productModel.findById({_id: product_id})

        if(!product){
            return res.status(400).json({message:'Produto não encontrado.'})
        }

        try {
            const product = await productModel.findByIdAndUpdate(product_id, productData)
            return res.status(200).json({message:'Produto atualizado com sucesso.'})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Ocorreu um erro ao atualizar o produto.'})
            
        }

        

        




        

    }


}

module.exports = ProductController