import { IAuthUsecase } from '../entities/usecase/auth.usecase'
import { UserInterface } from '../entities/model/user.model'
import { UserRepository } from '../repositories/user.repository'

export class AuthUsecase implements IAuthUsecase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async register(
    email: string,
    password: string,
    name: string,
  ): Promise<UserInterface> {
    if (!email || !password) {
      throw new Error('Name and email are required')
    }
    return this.userRepository.createUser({ email, password, name })
  }
}
