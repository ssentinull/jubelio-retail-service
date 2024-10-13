import { User } from '../models/user.model'
import { Product, GetRequest } from '../models/product.model'

export interface IProductUsecase {
  getProducts(params: GetRequest): Promise<Product[]>
  createProduct(user: User, payload: Product): Promise<Product>
  deleteProduct(user: User, id: number): Promise<Product>
}
