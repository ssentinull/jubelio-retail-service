import { Inventory, InventoryMovement } from '../models/inventory.model'

export interface IInventoryRepository {
  getInventoryById(id: number): Promise<Inventory | null>
  createInventory(inventory: Omit<Inventory, 'id'>): Promise<Inventory>
  updateInventoryStock(inventory: Inventory): Promise<Inventory>
  createInventoryMovement(
    inventoryMovement: Omit<InventoryMovement, 'id'>,
  ): Promise<InventoryMovement>
}
