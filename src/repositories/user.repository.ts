import { IDatabaseAdapter } from '../entities/adapters/db.adapter';
import { UserInterface } from '../entities/model/user.model';

export class UserRepository {
  private dbAdapter: IDatabaseAdapter;

  constructor(dbAdapter: IDatabaseAdapter) {
      this.dbAdapter = dbAdapter;
  }

  async getUserById(id: number): Promise<UserInterface | null> {
      const query = 'SELECT id, name, email FROM users WHERE id = $1';
      return this.dbAdapter.queryOne<UserInterface>(query, [id]);
  }

  async createUser(user: Omit<UserInterface, 'id'>): Promise<UserInterface> {
      const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`;
      return this.dbAdapter.insert<UserInterface>(query, [user.name, user.email, user.password]);
  }
}
