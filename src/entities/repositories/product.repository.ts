import { Product } from '../models/product.model'

export interface IProductRepository {
  createProduct(product: Omit<Product, 'id'>): Promise<Product>
}
