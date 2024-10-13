import { User } from '../models/user.model'
import { Warehouse } from '../models/warehouse.model'

export interface IWarehouseUsecase {
  createWarehouse(user: User, payload: Warehouse): Promise<Warehouse>
}
