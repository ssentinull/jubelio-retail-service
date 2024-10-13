import { FastifyReply, FastifyRequest } from 'fastify'
import { Product } from '../entities/models/product.model'
import { User } from '../entities/models/user.model'
import { ProductUsecase } from '../usecases/product.usecase'
import * as constants from '../constants/error.constant'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/env.config'

export class ProductController {
  private productUsecase: ProductUsecase

  constructor(productUsecase: ProductUsecase) {
    this.productUsecase = productUsecase
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers['authorization']
      if (!authHeader) {
        return reply
          .status(401)
          .send({ message: 'Authorization header not provided' })
      }

      const token = authHeader.split(' ')[1]
      if (!token) {
        return reply.status(401).send({ message: 'Token not provided' })
      }

      let user: User
      try {
        const claims = jwt.verify(token, config.JwtSecretKey)
        user = claims as User
      } catch (error) {
        return reply.status(401).send({ message: 'Invalid token' })
      }

      const payload = request.body as Product
      const product = await this.productUsecase.createProduct(user, payload)

      return reply.status(201).send(product)
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.INVALID_PAYLOAD:
          return reply.code(400).send({ message: (error as Error).message })
        default:
          return reply.code(500).send({ message: 'internal server error' })
      }
    }
  }
}
