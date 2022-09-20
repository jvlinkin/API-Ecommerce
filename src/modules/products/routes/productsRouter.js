const {Router} = require('express')
const {celebrate, Joi, Segments} = require('celebrate')
const ProductController = require('../controller/ProductController')
const productsRoutes = Router()
const productController = new ProductController()

productsRoutes.post('/create-product/:id',celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().required()
    },
    [Segments.BODY]:{
        productName: Joi.string().max(20).min(2).required(),
        productDescription: Joi.string().max(200).min(2).required(),
        productPrice: Joi.number().required(),
        productQuantity: Joi.number().required(),
        productImage: Joi.string().required()
    }
}),

productController.create)








module.exports = productsRoutes