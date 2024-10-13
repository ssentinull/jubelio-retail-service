import * as constants from '../constants/error.constant'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/env.config'
import { User } from '../entities/models/user.model'
import { Inventory } from 'src/entities/models/inventory.model'
import { InventoryUsecase } from '../usecases/inventory.usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  errorResponse,
  successResponse,
} from '../entities/models/response.model'

export class InventoryController {
  private inventoryUsecase: InventoryUsecase

  constructor(productUsecase: InventoryUsecase) {
    this.inventoryUsecase = productUsecase
  }

  async createInventory(request: FastifyRequest, reply: FastifyReply) {
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

      const payload = request.body as Inventory
      const inventory = await this.inventoryUsecase.createInventory(
        user,
        payload,
      )

      return reply
        .status(201)
        .send(successResponse(inventory, 'success create inventory'))
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
