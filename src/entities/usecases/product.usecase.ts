import { User } from '../models/user.model'
import { Product } from '../models/product.model'

export interface IProductUsecase {
  createProduct(user: User, payload: Product): Promise<Product>
}
