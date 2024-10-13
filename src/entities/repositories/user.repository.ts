import { User } from '../models/user.model'

export interface IUserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>
  getUserById(id: number): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getPasswordByEmail(email: string): Promise<User | null>
}
