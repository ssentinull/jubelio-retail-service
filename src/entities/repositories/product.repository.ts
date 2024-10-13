import { Product } from '../models/product.model'

export interface IProductRepository {
  getProductById(id: number): Promise<Product | null>
  createProduct(product: Omit<Product, 'id'>): Promise<Product>
  deleteProduct(product: Product): Promise<Product>
}
