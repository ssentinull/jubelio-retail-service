import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth.controller'

export function registerAuthRoutes(
  fastify: FastifyInstance,
  userController: AuthController,
) {
  fastify.post('/auth/register', userController.register.bind(userController))
}
