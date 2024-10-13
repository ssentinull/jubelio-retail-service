import * as constants from '../constants/error.constant'
import { User } from '../entities/models/user.model'
import { Inventory } from '../entities/models/inventory.model'
import { IInventoryUsecase } from '../entities/usecases/inventory.usecase'
import { InventoryRepository } from '../repositories/inventory.repository'
import { UserRepository } from '../repositories/user.repository'
import { ProductRepository } from 'src/repositories/product.repository'
import { WarehouseRepository } from 'src/repositories/warehouse.repository'

export class InventoryUsecase implements IInventoryUsecase {
  private inventoryRepository: InventoryRepository
  private userRepository: UserRepository
  private productRepository: ProductRepository
  private warehouseRepository: WarehouseRepository

  constructor(
    inventoryRepository: InventoryRepository,
    userRepository: UserRepository,
    productRepository: ProductRepository,
    warehouseRepository: WarehouseRepository,
  ) {
    this.inventoryRepository = inventoryRepository
    this.userRepository = userRepository
    this.productRepository = productRepository
    this.warehouseRepository = warehouseRepository
  }

  async createInventory(user: User, payload: Inventory): Promise<Inventory> {
    try {
      const existingUser = await this.userRepository.getUserById(user.id)
      if (!existingUser) {
        throw constants.DATA_NOT_FOUND
      }

      const existingProduct = await this.productRepository.getProductById(
        payload.product_id,
      )
      if (!existingProduct) {
        throw constants.DATA_NOT_FOUND
      }

      const existingWarehouse = await this.warehouseRepository.getWarehouseById(
        payload.warehouse_id,
      )
      if (!existingWarehouse) {
        throw constants.DATA_NOT_FOUND
      }

      return this.inventoryRepository.createInventory(payload)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
