import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IUserRepository } from '../entities/repositories/user.repository'
import { User } from '../entities/models/user.model'

export class UserRepository implements IUserRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async getUserById(id: number): Promise<User | null> {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1'
    return this.dbAdapter.queryOne<User>(query, [id])
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query =
      'SELECT id, name, email, created_at FROM users WHERE email = $1'
    return this.dbAdapter.queryOne<User>(query, [email])
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const createdAt = new Date()
    const query = `INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING id, name, email, created_at`
    return this.dbAdapter.insert<User>(query, [
      user.name,
      user.email,
      user.password,
      createdAt,
    ])
  }

  async getPasswordByEmail(email: string): Promise<User | null> {
    const query = `SELECT password FROM users WHERE email = $1`
    return this.dbAdapter.queryOne<User>(query, [email])
  }
}
