import { User } from '../models/user.model'
import {
  Inventory,
  InventoryMovement,
  MoveRequest,
} from '../models/inventory.model'

export interface IInventoryUsecase {
  createInventory(user: User, payload: Inventory): Promise<Inventory>
  moveInventory(user: User, payload: MoveRequest): Promise<InventoryMovement>
}
