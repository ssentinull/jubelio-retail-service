import { FastifyInstance } from 'fastify'
import { ProductController } from '../controllers/product.controller'

export function registerProductRoutes(
  fastify: FastifyInstance,
  productController: ProductController,
) {
  fastify.post(
    '/products',
    productController.createProduct.bind(productController),
  )
  fastify.delete(
    '/products/:id',
    productController.deleteProduct.bind(productController),
  )
}
