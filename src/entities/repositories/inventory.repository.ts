import {
  GetRequest,
  Inventory,
  InventoryMovement,
} from '../models/inventory.model'

export interface IInventoryRepository {
  getInventoryById(id: number): Promise<Inventory | null>
  getInventory(params: GetRequest): Promise<Inventory | null>
  getInventories(params: GetRequest): Promise<Inventory[]>
  createInventory(inventory: Omit<Inventory, 'id'>): Promise<Inventory>
  updateInventoryStock(inventory: Inventory): Promise<Inventory>
  createInventoryMovement(
    inventoryMovement: Omit<InventoryMovement, 'id'>,
  ): Promise<InventoryMovement>
  getInventoryMovements(params: GetRequest): Promise<InventoryMovement[]>
}
