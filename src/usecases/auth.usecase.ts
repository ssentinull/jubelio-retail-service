import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User } from '../entities/models/user.model'
import { LoginRequest, JwtUserClaims } from 'src/entities/models/auth.model'
import { IAuthUsecase } from '../entities/usecases/auth.usecase'
import { UserRepository } from '../repositories/user.repository'
import * as constants from '../constants/error.constant'
import { config } from '../config/env.config'

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
      if (existingUser != null) {
        throw constants.DUPLICATE_ROW
      }

      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(user.password, salt)

      user.password = hashedPassword

      return this.userRepository.createUser(user)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async login(payload: LoginRequest): Promise<string> {
    try {
      if (!payload.email || !payload.password) {
        throw constants.INVALID_PAYLOAD
      }

      const existingUser = await this.userRepository.getUserByEmail(
        payload.email,
      )
      if (!existingUser) {
        throw constants.NOT_FOUND
      }

      const existingUserWithPassword =
        await this.userRepository.getPasswordByEmail(payload.email)
      if (!existingUserWithPassword) {
        throw constants.NOT_FOUND
      }

      const isMatch = await bcrypt.compare(
        payload.password,
        existingUserWithPassword.password,
      )

      if (!isMatch) {
        throw constants.INVALID_USERNAME_PASSWORD
      }

      const jwtClaims: JwtUserClaims = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      }

      const token = jwt.sign(jwtClaims, config.JwtSecretKey, {
        expiresIn: '1h',
      })

      return token
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
