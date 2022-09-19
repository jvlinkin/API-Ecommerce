const {Router} = require('express')
const usersRoutes = Router()
const UserController = require('../controller/UserController')
const {celebrate, Joi, Segments} = require('celebrate')

const userController = new UserController()

usersRoutes.post('/cadastro',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        age: Joi.number().min(18).required(),
        cellphone: Joi.string().max(15).required(),
        email:Joi.string().email().required(),
        username: Joi.string().max(15).min(2).required(),
        password: Joi.string()
        .required()
        .min(8)
        .max(15),
        
    })}),userController.create)

    usersRoutes.post('/forgot-password',celebrate({
        [Segments.BODY]:{
            email:Joi.string().email().required(),
        }
    }),userController.forgotPassword)

    usersRoutes.post('/reset-password/:token',celebrate({
        [Segments.PARAMS]:{
            token: Joi.string().hex().required(),
        },
        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),userController.resetPassword)


    usersRoutes.post('/login',celebrate({

        [Segments.BODY]:{
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        },),userController.login)








module.exports = usersRoutes