const bcrypt = require('bcrypt')
import { User } from '../entities/models/user.model'
import { IAuthUsecase } from '../entities/usecases/auth.usecase'
import { UserRepository } from '../repositories/user.repository'
import * as constants from '../constants/error.constant'

export class AuthUsecase implements IAuthUsecase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async register(user: User): Promise<User> {
    try {
      if (!user.email || !user.password) {
        throw constants.INVALID_PAYLOAD
      }

      const existingUser = await this.userRepository.getUserByEmail(user.email)
      if (!existingUser || existingUser.id != 0) {
        throw constants.DUPLICATE_ROW
      }

      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword

      return this.userRepository.createUser(user)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
