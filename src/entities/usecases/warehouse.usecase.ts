import { User } from '../models/user.model'
import {
  GetInventoriesRequest,
  Warehouse,
  WarehouseInventory,
} from '../models/warehouse.model'

export interface IWarehouseUsecase {
  createWarehouse(user: User, payload: Warehouse): Promise<Warehouse>
  getWarehouseInventories(
    user: User,
    params: GetInventoriesRequest,
  ): Promise<WarehouseInventory>
}
