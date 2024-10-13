import pgPromise = require('pg-promise')
import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { config } from '../config/env.config'

const dbConfig = {
  host: config.DbHost,
  port: parseInt(config.DbPort),
  database: config.DbName,
  user: config.DbUsername,
  password: config.DbPasword,
}

const pgp = pgPromise()
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

export { db }
