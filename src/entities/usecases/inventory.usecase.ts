import { User } from '../models/user.model'
import { Inventory } from '../models/inventory.model'

export interface IInventoryUsecase {
  createInventory(user: User, payload: Inventory): Promise<Inventory>
}
