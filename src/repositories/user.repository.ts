import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IUserRepository } from '../entities/repositories/user.repository'
import { User } from '../entities/models/user.model'

export class UserRepository implements IUserRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async getUserById(id: number): Promise<User | null> {
    const query = 'SELECT id, name, email FROM users WHERE id = $1'
    return this.dbAdapter.queryOne<User>(query, [id])
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`
    return this.dbAdapter.insert<User>(query, [
      user.name,
      user.email,
      user.password,
    ])
  }
}
