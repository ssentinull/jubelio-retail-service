import { PGPromiseAdapter } from '../adapters/db.adapter'
import { UserRepository } from '../repositories/user.repository'
import { ProductRepository } from '../repositories/product.repository'
import { AuthUsecase } from '../usecases/auth.usecase'
import { ProductUsecase } from '../usecases/product.usecase'
import { AuthController } from '../controllers/auth.controller'
import { ProductController } from '../controllers/product.controller'
import { registerAuthRoutes } from '../routes/auth.route'
import { registerProductRoutes } from '../routes/product.route'
import fastify from 'fastify'

const app = fastify()
const dbAdapter = new PGPromiseAdapter()
const userRepository = new UserRepository(dbAdapter)
const authUsecase = new AuthUsecase(userRepository)
const authContoller = new AuthController(authUsecase)

const productRepository = new ProductRepository(dbAdapter)
const productUsecase = new ProductUsecase(productRepository, userRepository)
const productController = new ProductController(productUsecase)

registerAuthRoutes(app, authContoller)
registerProductRoutes(app, productController)

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
