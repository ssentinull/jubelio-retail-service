import { User } from '../models/user.model'
import { LoginRequest } from '../models/auth.model'

export interface IAuthUsecase {
  register(user: User): Promise<User>
  login(payload: LoginRequest): Promise<string>
}
