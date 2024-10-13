import { User } from '../entities/models/user.model'
import { Product } from '../entities/models/product.model'
import { IProductUsecase } from '../entities/usecases/product.usecase'
import { ProductRepository } from '../repositories/product.repository'
import { UserRepository } from 'src/repositories/user.repository'
import * as constants from '../constants/error.constant'

export class ProductUsecase implements IProductUsecase {
  private productRepository: ProductRepository
  private userRepository: UserRepository

  constructor(
    productRepository: ProductRepository,
    userRepository: UserRepository,
  ) {
    this.productRepository = productRepository
    this.userRepository = userRepository
  }

  async createProduct(user: User, payload: Product): Promise<Product> {
    try {
      const existingUser = await this.userRepository.getPasswordByEmail(
        user.email,
      )
      if (!existingUser) {
        throw constants.DATA_NOT_FOUND
      }

      payload.user_id = user.id
      payload.created_by = user.email

      return this.productRepository.createProduct(payload)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteProduct(user: User, id: number): Promise<Product> {
    try {
      const existingProduct = await this.productRepository.getProductById(id)
      if (!existingProduct) {
        throw constants.DATA_NOT_FOUND
      }

      existingProduct.deleted_by = user.email

      return this.productRepository.deleteProduct(existingProduct)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
