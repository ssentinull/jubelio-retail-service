import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth.controller'

export function registerAuthRoutes(
  fastify: FastifyInstance,
  authContoller: AuthController,
) {
  fastify.post('/auth/register', authContoller.register.bind(authContoller))
  fastify.post('/auth/login', authContoller.login.bind(authContoller))
}
