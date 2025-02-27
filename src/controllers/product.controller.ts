import * as constants from '../constants/error.constant'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/env.config'
import { User } from '../entities/models/user.model'
import { ProductUsecase } from '../usecases/product.usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  Product,
  DeleteRequest,
  GetRequest,
} from '../entities/models/product.model'
import {
  errorResponse,
  successResponse,
} from '../entities/models/response.model'

export class ProductController {
  private productUsecase: ProductUsecase

  constructor(productUsecase: ProductUsecase) {
    this.productUsecase = productUsecase
  }

  async getProducts(
    request: FastifyRequest<{ Querystring: GetRequest }>,
    reply: FastifyReply,
  ) {
    try {
      const authHeader = request.headers['authorization']
      if (!authHeader) {
        return reply
          .status(401)
          .send(errorResponse('authorization header not provided'))
      }

      const token = authHeader.split(' ')[1]
      if (!token) {
        return reply.status(401).send(errorResponse('token not provided'))
      }

      let user: User
      try {
        const claims = jwt.verify(token, config.JwtSecretKey)
        user = claims as User
      } catch (error) {
        return reply.status(401).send(errorResponse('invalid token'))
      }

      const { page, size } = request.query
      const params = new GetRequest(user.id, page, size)
      const product = await this.productUsecase.getProducts(params)

      return reply
        .status(200)
        .send(successResponse(product, 'success get products'))
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.DATA_NOT_FOUND:
          return reply.code(404).send(errorResponse((error as Error).message))
        default:
          return reply.code(500).send(errorResponse('internal server error'))
      }
    }
  }

  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers['authorization']
      if (!authHeader) {
        return reply
          .status(401)
          .send(errorResponse('authorization header not provided'))
      }

      const token = authHeader.split(' ')[1]
      if (!token) {
        return reply.status(401).send(errorResponse('token not provided'))
      }

      let user: User
      try {
        const claims = jwt.verify(token, config.JwtSecretKey)
        user = claims as User
      } catch (error) {
        return reply.status(401).send(errorResponse('invalid token'))
      }

      const payload = request.body as Product
      const product = await this.productUsecase.createProduct(user, payload)

      return reply
        .status(201)
        .send(successResponse(product, 'success create product'))
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.DATA_NOT_FOUND:
          return reply.code(404).send(errorResponse((error as Error).message))
        default:
          return reply.code(500).send(errorResponse('internal server error'))
      }
    }
  }

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers['authorization']
      if (!authHeader) {
        return reply
          .status(401)
          .send(errorResponse('authorization header not provided'))
      }

      const token = authHeader.split(' ')[1]
      if (!token) {
        return reply.status(401).send(errorResponse('token not provided'))
      }

      let user: User
      try {
        const claims = jwt.verify(token, config.JwtSecretKey)
        user = claims as User
      } catch (error) {
        return reply.status(401).send(errorResponse('invalid token'))
      }

      const { id } = request.params as DeleteRequest
      const product = await this.productUsecase.deleteProduct(user, id)

      return reply
        .status(200)
        .send(successResponse(product, 'success delete product'))
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.DATA_NOT_FOUND:
          return reply.code(404).send(errorResponse((error as Error).message))
        default:
          return reply.code(500).send(errorResponse('internal server error'))
      }
    }
  }
}
