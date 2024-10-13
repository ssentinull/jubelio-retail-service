import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../entities/models/user.model'
import { AuthUsecase } from '../usecases/auth.usecase'

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
      return reply.code(500).send({ message: 'error' })
    }
  }
}
