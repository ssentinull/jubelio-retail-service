import { User } from '../models/user.model'

export interface IAuthUsecase {
  register(user: User): Promise<User>
}
