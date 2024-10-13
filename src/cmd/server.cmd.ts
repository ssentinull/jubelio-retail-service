import { PGPromiseAdapter } from '../adapters/db.adapter'
import { UserRepository } from '../repositories/user.repository'
import { ProductRepository } from '../repositories/product.repository'
import { AuthUsecase } from '../usecases/auth.usecase'
import { ProductUsecase } from '../usecases/product.usecase'
import { AuthController } from '../controllers/auth.controller'
import { ProductController } from '../controllers/product.controller'
import { registerAuthRoutes } from '../routes/auth.route'
import { registerProductRoutes } from '../routes/product.route'
import { WarehouseRepository } from '../repositories/warehouse.repository'
import { WarehouseUsecase } from '../usecases/warehouse.usecase'
import { WarehouseController } from '../controllers/warehouse.controller'
import { registerWarehouseRoutes } from '../routes/warehouse.route'
import { config } from '../config/env.config'
import fastify from 'fastify'

const dbAdapter = new PGPromiseAdapter()
const userRepository = new UserRepository(dbAdapter)
const authUsecase = new AuthUsecase(userRepository)
const authContoller = new AuthController(authUsecase)

const productRepository = new ProductRepository(dbAdapter)
const productUsecase = new ProductUsecase(productRepository, userRepository)
const productController = new ProductController(productUsecase)

const warehouseRepository = new WarehouseRepository(dbAdapter)
const warehouseUsecase = new WarehouseUsecase(
  warehouseRepository,
  userRepository,
)
const warehouseController = new WarehouseController(warehouseUsecase)

const app = fastify()
registerAuthRoutes(app, authContoller)
registerProductRoutes(app, productController)
registerWarehouseRoutes(app, warehouseController)

app.listen({ port: parseInt(config.Port) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
