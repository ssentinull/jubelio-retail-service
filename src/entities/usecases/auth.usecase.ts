import { User } from '../models/user.model'
import { LoginRequest } from '../models/auth.model'

export interface IAuthUsecase {
  registerUser(user: User): Promise<User>
  loginUser(payload: LoginRequest): Promise<string>
}
