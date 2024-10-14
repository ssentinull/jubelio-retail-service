import * as constants from '../constants/error.constant'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/env.config'
import { User } from '../entities/models/user.model'
import { WarehouseUsecase } from '../usecases/warehouse.usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Warehouse } from '../entities/models/warehouse.model'
import {
  errorResponse,
  successResponse,
} from '../entities/models/response.model'

export class WarehouseController {
  private warehouseUsecase: WarehouseUsecase

  constructor(productUsecase: WarehouseUsecase) {
    this.warehouseUsecase = productUsecase
  }

  async createWarehouse(request: FastifyRequest, reply: FastifyReply) {
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

      const payload = request.body as Warehouse
      const warehouse = await this.warehouseUsecase.createWarehouse(
        user,
        payload,
      )

      return reply
        .status(201)
        .send(successResponse(warehouse, 'success create warehouse'))
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
