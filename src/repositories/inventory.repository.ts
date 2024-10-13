import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IInventoryRepository } from '../entities/repositories/inventory.repository'
import { Inventory } from '../entities/models/inventory.model'

export class InventoryRepository implements IInventoryRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async createInventory(inventory: Omit<Inventory, 'id'>): Promise<Inventory> {
    const createdAt = new Date()
    const query = `INSERT INTO warehouse_inventories (stock, product_id, warehouse_id, created_at, created_by) VALUES ($1, $2, $3, $4, $4) RETURNING id, stock, product_id, warehouse_id, created_at, created_by`
    return this.dbAdapter.insert<Inventory>(query, [
      inventory.stock,
      inventory.product_id,
      inventory.warehouse_id,
      createdAt,
      inventory.created_by,
    ])
  }
}
