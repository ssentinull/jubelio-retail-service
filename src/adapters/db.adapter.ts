import pgPromise = require('pg-promise')
import { IDatabaseAdapter } from '../entities/adapters/db.adapter'

const pgp = pgPromise()

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'library',
  user: 'efishery',
  password: '',
}

const db = pgp(dbConfig)

export class PGPromiseAdapter implements IDatabaseAdapter {
  async query<T>(query: string, params: any[] = []): Promise<T[]> {
    return db.any<T>(query, params)
  }

  async queryOne<T>(query: string, params: any[] = []): Promise<T | null> {
    return db.oneOrNone<T>(query, params)
  }

  async insert<T>(query: string, params: any[] = []): Promise<T> {
    return db.one<T>(query, params)
  }

  async update<T>(query: string, params: any[] = []): Promise<T> {
    return db.one<T>(query, params)
  }

  close(): void {
    pgp.end()
  }
}
