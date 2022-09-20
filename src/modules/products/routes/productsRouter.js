const {Router} = require('express')
const {celebrate, Joi, Segments} = require('celebrate')
const ProductController = require('../controller/ProductController')
const productsRoutes = Router()
const productController = new ProductController()

//Rotas ADMIN

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
    }}),productController.create)


productsRoutes.delete('/delete-product/:id/:product_id', celebrate({
    [Segments.PARAMS]:{
        id:Joi.required(),
        product_id:Joi.required()
    }}),productController.deleteProduct)


    productsRoutes.patch('/edit-product/:id/:product_id', celebrate({
    [Segments.PARAMS]:{
        id:Joi.required(),
        product_id:Joi.required()
    },
    [Segments.BODY]:{
        productName: Joi.string().max(20).min(2),
        productDescription: Joi.string().max(200).min(2),
        productPrice: Joi.number(),
        productQuantity: Joi.number(),
        productImage: Joi.string()

    }}),productController.editProduct)

    productsRoutes.get('/all', productController.getAllProducts)

    productsRoutes.get('/:product_id', celebrate({
        [Segments.PARAMS]:{
            product_id: Joi.required()
        }
    })
     ,productController.getProduct)








module.exports = productsRoutes