import { User } from '../models/user.model'

export interface IAuthUsecase {
  register(email: string, password: string, name: string): Promise<User>
}
