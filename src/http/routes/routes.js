const {Router} = require('express')
const routes = Router()
const usersRoutes = require('../../modules/users/routes/usersRouter')
const productsRoutes = require('../../modules/products/routes/productsRouter')

routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)

module.exports = routes
