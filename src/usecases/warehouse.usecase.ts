import * as constants from '../constants/error.constant'
import { User } from '../entities/models/user.model'
import {
  GetInventoriesRequest,
  Warehouse,
  WarehouseInventory,
} from '../entities/models/warehouse.model'
import { WarehouseRepository } from '../repositories/warehouse.repository'
import { UserRepository } from '../repositories/user.repository'
import { IWarehouseUsecase } from '../entities/usecases/warehouse.usecase'
import { InventoryRepository } from '../repositories/inventory.repository'
import { GetRequest } from '../entities/models/inventory.model'

export class WarehouseUsecase implements IWarehouseUsecase {
  private warehouseRepository: WarehouseRepository
  private userRepository: UserRepository
  private inventoryRepository: InventoryRepository

  constructor(
    warehouseRepository: WarehouseRepository,
    userRepository: UserRepository,
    inventoryRepository: InventoryRepository,
  ) {
    this.warehouseRepository = warehouseRepository
    this.userRepository = userRepository
    this.inventoryRepository = inventoryRepository
  }

  async createWarehouse(user: User, payload: Warehouse): Promise<Warehouse> {
    try {
      const existingUser = await this.userRepository.getUserById(user.id)
      if (!existingUser) {
        throw constants.DATA_NOT_FOUND
      }

      payload.user_id = user.id
      payload.created_at = new Date().toLocaleString()
      payload.created_by = user.email

      return this.warehouseRepository.createWarehouse(payload)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getWarehouseInventories(
    user: User,
    params: GetInventoriesRequest,
  ): Promise<WarehouseInventory> {
    try {
      const existingUser = await this.userRepository.getUserById(user.id)
      if (!existingUser) {
        throw constants.DATA_NOT_FOUND
      }

      const warehouse = await this.warehouseRepository.getWarehouseById(
        params.warehouse_id,
      )
      if (!warehouse) {
        throw constants.DATA_NOT_FOUND
      }

      const getInventoriesParams = new GetRequest(
        0,
        0,
        params.warehouse_id,
        1,
        25,
      )
      const inventories =
        await this.inventoryRepository.getInventories(getInventoriesParams)

      const warehouseInventory: WarehouseInventory = {
        id: warehouse.id,
        name: warehouse.name,
        user_id: user.id,
        created_at: warehouse.created_at,
        created_by: warehouse.created_by,
        inventories: inventories,
      }

      return warehouseInventory
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
