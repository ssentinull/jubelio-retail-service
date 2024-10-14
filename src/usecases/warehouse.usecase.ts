import * as constants from '../constants/error.constant'
import { User } from '../entities/models/user.model'
import { Warehouse } from '../entities/models/warehouse.model'
import { WarehouseRepository } from '../repositories/warehouse.repository'
import { UserRepository } from '../repositories/user.repository'
import { IWarehouseUsecase } from '../entities/usecases/warehouse.usecase'

export class WarehouseUsecase implements IWarehouseUsecase {
  private warehouseRepository: WarehouseRepository
  private userRepository: UserRepository

  constructor(
    warehouseRepository: WarehouseRepository,
    userRepository: UserRepository,
  ) {
    this.warehouseRepository = warehouseRepository
    this.userRepository = userRepository
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
}
