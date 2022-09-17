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









module.exports = usersRoutes