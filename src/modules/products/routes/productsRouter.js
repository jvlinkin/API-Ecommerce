const {Router} = require('express')
const {celebrate, Joi, Segments} = require('celebrate')
const ProductController = require('../controller/ProductController')
const productsRoutes = Router()
const productController = new ProductController()
const isAuthenticated = require('../../../middlewares/isAuthenticated')

//Rotas ADMIN

productsRoutes.post('/create-product/:user_id',isAuthenticated,celebrate({
    [Segments.PARAMS]:{
        user_id: Joi.string().required()
    },
    [Segments.BODY]:{
        productName: Joi.string().max(20).min(2).required(),
        productDescription: Joi.string().max(200).min(2).required(),
        productPrice: Joi.number().required(),
        productQuantity: Joi.number().required(),
        productImage: Joi.string().required()
    }}),productController.create)


productsRoutes.delete('/delete-product/:user_id/:product_id',isAuthenticated ,celebrate({
    [Segments.PARAMS]:{
        user_id:Joi.required(),
        product_id:Joi.required()
    }}),productController.deleteProduct)


    productsRoutes.patch('/edit-product/:user_id/:product_id',isAuthenticated ,celebrate({
    [Segments.PARAMS]:{
        user_id:Joi.required(),
        product_id:Joi.required()
    },
    [Segments.BODY]:{
        productName: Joi.string().max(20).min(2),
        productDescription: Joi.string().max(200).min(2),
        productPrice: Joi.number(),
        productQuantity: Joi.number(),
        productImage: Joi.string()

    }}),productController.editProduct)

    productsRoutes.get('/all/:user_id', celebrate({
        [Segments.PARAMS]:{
            user_id:Joi.required()
        }
    }),isAuthenticated,productController.getAllProducts)

    productsRoutes.get('/:user_id/:product_id',isAuthenticated ,celebrate({
        [Segments.PARAMS]:{
            user_id:Joi.required(),
            product_id: Joi.required()
        }
    })
     ,productController.getProduct)








module.exports = productsRoutes