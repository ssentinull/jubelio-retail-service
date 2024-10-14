import { User } from '../models/user.model'
import {
  GetRequest,
  Inventory,
  InventoryMovement,
  MoveRequest,
} from '../models/inventory.model'

export interface IInventoryUsecase {
  createInventory(user: User, payload: Inventory): Promise<Inventory>
  moveInventory(user: User, payload: MoveRequest): Promise<InventoryMovement>
  getInventoryMovements(
    user: User,
    params: Omit<GetRequest, 'product_id' | 'warehouse_id'>,
  ): Promise<InventoryMovement[]>
}
