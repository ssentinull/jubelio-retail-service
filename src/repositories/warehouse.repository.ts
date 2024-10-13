import { Warehouse } from '../entities/models/warehouse.model'
import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IWarehouseRepository } from '../entities/repositories/warehouse.repository'

export class WarehouseRepository implements IWarehouseRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async createWarehouse(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse> {
    const createdAt = new Date()
    const query = `INSERT INTO warehouses (name, user_id, created_at, created_by) VALUES ($1, $2, $3, $4) RETURNING id, name, user_id, created_at, created_by`
    return this.dbAdapter.insert<Warehouse>(query, [
      warehouse.name,
      warehouse.user_id,
      createdAt,
      warehouse.created_by,
    ])
  }
}
