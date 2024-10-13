import { Inventory } from '../models/inventory.model'

export interface IInventoryRepository {
  createInventory(inventory: Omit<Inventory, 'id'>): Promise<Inventory>
}
