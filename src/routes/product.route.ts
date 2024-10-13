import { FastifyInstance } from 'fastify'
import { ProductController } from '../controllers/product.controller'

export function registerProductRoutes(
  fastify: FastifyInstance,
  productController: ProductController,
) {
  fastify.post('/product', productController.create.bind(productController))
}
