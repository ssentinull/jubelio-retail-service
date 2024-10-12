import { User } from '../models/user.model'

export interface IUserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>
}
