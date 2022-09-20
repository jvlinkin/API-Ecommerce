const {Router} = require('express')
const routes = Router()
const usersRoutes = require('../../modules/users/routes/usersRouter')
const productsRoutes = require('../../modules/products/routes/productsRouter')
const cartRouter = require('../../modules/cart/routes/cartRouter')

routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)
routes.use('/carts', cartRouter )

module.exports = routes
