const {Router} = require('express')
const {celebrate, Joi, Segments} = require('celebrate')
const CartController = require('../controller/CartController')
const cartRouter = Router()
const cartController = new CartController()

const isAuthenticated = require('../../../middlewares/isAuthenticated')

cartRouter.post('/create-order/:user_id',isAuthenticated ,celebrate({
    [Segments.PARAMS]:{
        user_id: Joi.string().min(24).max(24).required()
    },
    [Segments.BODY]:{
        products:Joi.required(),
        address: Joi.required(),
        payment: Joi.required()
    }
}),cartController.createOrder)

cartRouter.get('/list-orders/:user_id',isAuthenticated ,celebrate({
    [Segments.PARAMS]:{
        user_id: Joi.string().min(24).max(24).required()
    }
}) ,cartController.listOrders)






module.exports = cartRouter