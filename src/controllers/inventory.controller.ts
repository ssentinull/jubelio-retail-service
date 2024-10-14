import * as constants from '../constants/error.constant'
import * as jwt from 'jsonwebtoken'
import { config } from '../config/env.config'
import { User } from '../entities/models/user.model'
import {
  GetRequest,
  Inventory,
  MoveRequest,
} from 'src/entities/models/inventory.model'
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
        case constants.DUPLICATE_DATA:
          return reply.code(409).send(errorResponse((error as Error).message))
        default:
          return reply.code(500).send(errorResponse('internal server error'))
      }
    }
  }

  async moveInventory(request: FastifyRequest, reply: FastifyReply) {
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

      const payload = request.body as MoveRequest
      const inventory = await this.inventoryUsecase.moveInventory(user, payload)

      return reply
        .status(200)
        .send(successResponse(inventory, 'success create inventory movement'))
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.ENUM_NOT_DEFINED:
          return reply.code(400).send(errorResponse((error as Error).message))
        case constants.DATA_NOT_FOUND:
          return reply.code(404).send(errorResponse((error as Error).message))
        case constants.INVALID_LOGIC:
          return reply.code(422).send(errorResponse((error as Error).message))
        default:
          return reply.code(500).send(errorResponse('internal server error'))
      }
    }
  }

  async getInventoryMovements(request: FastifyRequest, reply: FastifyReply) {
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

      const params = request.params as Omit<
        GetRequest,
        'product_id' | 'warehouse_id'
      >

      console.log(params)
      const inventory = await this.inventoryUsecase.getInventoryMovements(
        user,
        params,
      )

      return reply
        .status(200)
        .send(successResponse(inventory, 'success get inventory movements'))
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
