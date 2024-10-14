import * as errorConstants from '../constants/error.constant'
import * as inventoryConstants from '../constants/inventory.constant'
import { User } from '../entities/models/user.model'
import {
  GetRequest,
  Inventory,
  InventoryMovement,
  MoveRequest,
} from '../entities/models/inventory.model'
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
        throw errorConstants.DATA_NOT_FOUND
      }

      const existingProduct = await this.productRepository.getProductById(
        payload.product_id,
      )
      if (!existingProduct) {
        throw errorConstants.DATA_NOT_FOUND
      }

      const existingWarehouse = await this.warehouseRepository.getWarehouseById(
        payload.warehouse_id,
      )
      if (!existingWarehouse) {
        throw errorConstants.DATA_NOT_FOUND
      }

      const getInventoryParams: GetRequest = {
        product_id: payload.product_id,
        warehouse_id: payload.warehouse_id,
        inventory_id: 0,
      }

      const existingInventory =
        await this.inventoryRepository.getInventory(getInventoryParams)
      if (existingInventory) {
        throw errorConstants.DUPLICATE_DATA
      }

      payload.created_at = new Date().toLocaleString()
      payload.created_by = user.email

      return this.inventoryRepository.createInventory(payload)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async moveInventory(
    user: User,
    payload: MoveRequest,
  ): Promise<InventoryMovement> {
    try {
      const existingUser = await this.userRepository.getUserById(user.id)
      if (!existingUser) {
        throw errorConstants.DATA_NOT_FOUND
      }

      const existingInventory = await this.inventoryRepository.getInventoryById(
        payload.inventory_id,
      )
      if (!existingInventory) {
        throw errorConstants.DATA_NOT_FOUND
      }

      switch (payload.movement_type) {
        case inventoryConstants.INVENTORY_MOVEMENT_TYPE_USER_PURCHASE:
        case inventoryConstants.INVENTORY_MOVEMENT_TYPE_ADMIN_REDUCE_STOCK:
          existingInventory.stock -= payload.movement_size
          if (existingInventory.stock < 0) {
            throw errorConstants.INVALID_LOGIC
          }
          break

        case inventoryConstants.INVENTORY_MOVEMENT_TYPE_ADMIN_ADD_STOCK:
          existingInventory.stock += payload.movement_size
          break

        default:
          throw errorConstants.ENUM_NOT_DEFINED
      }

      const now = new Date().toLocaleString()
      existingInventory.updated_by = user.email
      existingInventory.updated_at = now
      await this.inventoryRepository.updateInventoryStock(existingInventory)

      const inventoryMovement: Omit<InventoryMovement, 'id'> = {
        movement_type: payload.movement_type,
        movement_size: payload.movement_size,
        inventory_id: payload.inventory_id,
        created_at: now,
        created_by: user.email,
      }

      return this.inventoryRepository.createInventoryMovement(inventoryMovement)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getInventoryMovements(
    user: User,
    params: GetRequest,
  ): Promise<InventoryMovement[]> {
    try {
      const existingUser = await this.userRepository.getUserById(user.id)
      if (!existingUser) {
        throw errorConstants.DATA_NOT_FOUND
      }

      const existingInventory = await this.inventoryRepository.getInventoryById(
        params.inventory_id,
      )
      if (!existingInventory) {
        throw errorConstants.DATA_NOT_FOUND
      }

      return this.inventoryRepository.getInventoryMovements(params)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
