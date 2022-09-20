const {Router} = require('express')
const {celebrate, Joi, Segments} = require('celebrate')
const CartController = require('../controller/CartController')
const cartRouter = Router()
const cartController = new CartController()

cartRouter.post('/create-order/:username', celebrate({
    [Segments.PARAMS]:{
        username: Joi.required()
    },
    [Segments.BODY]:{
        products:Joi.required(),
        address: Joi.required(),
        payment: Joi.required()
    }
}),cartController.createOrder)






module.exports = cartRouter