import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IInventoryRepository } from '../entities/repositories/inventory.repository'
import {
  GetRequest,
  Inventory,
  InventoryMovement,
} from '../entities/models/inventory.model'

export class InventoryRepository implements IInventoryRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async getInventoryById(id: number): Promise<Inventory | null> {
    const query = `SELECT id, stock, product_id, warehouse_id, created_at, created_by FROM warehouse_inventories WHERE id = $1`
    return this.dbAdapter.queryOne<Inventory>(query, [id])
  }

  async getInventory(params: GetRequest): Promise<Inventory | null> {
    const query = `SELECT id, stock, product_id, warehouse_id, created_at, created_by FROM warehouse_inventories WHERE product_id = $1 AND warehouse_id = $2`
    return this.dbAdapter.queryOne<Inventory>(query, [
      params.product_id,
      params.warehouse_id,
    ])
  }

  async createInventory(inventory: Omit<Inventory, 'id'>): Promise<Inventory> {
    const query = `INSERT INTO warehouse_inventories (stock, product_id, warehouse_id, created_at, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, stock, product_id, warehouse_id, created_at, created_by`
    return this.dbAdapter.insert<Inventory>(query, [
      inventory.stock,
      inventory.product_id,
      inventory.warehouse_id,
      inventory.created_at,
      inventory.created_by,
    ])
  }

  async updateInventoryStock(inventory: Inventory): Promise<Inventory> {
    const query = `UPDATE warehouse_inventories SET stock = $1, updated_at = $2, updated_by = $3 WHERE id = $4 RETURNING id, stock, product_id, warehouse_id, updated_by, updated_at`
    return this.dbAdapter.insert<Inventory>(query, [
      inventory.stock,
      inventory.updated_at,
      inventory.updated_by,
      inventory.id,
    ])
  }

  async createInventoryMovement(
    inventoryMovement: Omit<InventoryMovement, 'id'>,
  ): Promise<InventoryMovement> {
    const query = `INSERT INTO inventory_movements (movement_type, movement_size, inventory_id, created_at, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, movement_type, movement_size, inventory_id, created_at, created_by`
    return this.dbAdapter.insert<InventoryMovement>(query, [
      inventoryMovement.movement_type,
      inventoryMovement.movement_size,
      inventoryMovement.inventory_id,
      inventoryMovement.created_at,
      inventoryMovement.created_by,
    ])
  }

  getInventoryMovements(params: GetRequest): Promise<InventoryMovement[]> {
    const query = `SELECT id, movement_type, movement_size, created_at, created_by FROM inventory_movements WHERE inventory_id = $1`
    return this.dbAdapter.query<InventoryMovement>(query, [params.inventory_id])
  }
}
