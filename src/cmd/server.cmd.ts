import { PGPromiseAdapter } from '../adapters/db.adapter'
import { UserRepository } from '../repositories/user.repository'
import { AuthUsecase } from '../usecases/auth.usecase'
import { AuthController } from '../controllers/auth.controller'
import { registerAuthRoutes } from '../routes/auth.route'
import fastify from 'fastify'

const app = fastify()
const dbAdapter = new PGPromiseAdapter()
const userRepository = new UserRepository(dbAdapter)
const authUsecase = new AuthUsecase(userRepository)
const authContoller = new AuthController(authUsecase)

registerAuthRoutes(app, authContoller)

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
