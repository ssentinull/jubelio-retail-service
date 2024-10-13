const bcrypt = require('bcrypt')
import { IAuthUsecase } from '../entities/usecases/auth.usecase'
import { User } from '../entities/models/user.model'
import { UserRepository } from '../repositories/user.repository'

export class AuthUsecase implements IAuthUsecase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async register(user: User): Promise<User> {
    if (!user.email || !user.password) {
      throw new Error('email and password are required')
    }

    const existingUser = await this.userRepository.getUserByEmail(user.email)
    if (!existingUser || existingUser.id != 0) {
      throw Error(`user with email ${user.email} already exists`)
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword

    return this.userRepository.createUser(user)
  }
}
