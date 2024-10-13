import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../entities/models/user.model'
import { LoginRequest } from '../entities/models/auth.model'
import { AuthUsecase } from '../usecases/auth.usecase'
import * as constants from '../constants/error.constant'

export class AuthController {
  private authUsecase: AuthUsecase

  constructor(authUsecase: AuthUsecase) {
    this.authUsecase = authUsecase
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const payload = request.body as User
      const user = await this.authUsecase.register(payload)
      return reply.status(201).send(user)
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.INVALID_PAYLOAD:
          return reply.code(400).send({ message: (error as Error).message })
        case constants.DUPLICATE_ROW:
          return reply.code(409).send({ message: (error as Error).message })
        default:
          return reply.code(500).send({ message: 'internal server error' })
      }
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const payload = request.body as LoginRequest
      const jwtToken = await this.authUsecase.login(payload)
      return reply.status(200).send(jwtToken)
    } catch (error) {
      console.log(error)
      switch (error) {
        case constants.INVALID_USERNAME_PASSWORD:
          return reply.code(401).send({ message: (error as Error).message })
        case constants.NOT_FOUND:
          return reply.code(404).send({ message: (error as Error).message })
        default:
          return reply.code(500).send({ message: 'internal server error' })
      }
    }
  }
}
