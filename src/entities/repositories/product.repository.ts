import { GetRequest, Product } from '../models/product.model'

export interface IProductRepository {
  getProducts(params: GetRequest): Promise<Product[]>
  getProductById(id: number): Promise<Product | null>
  createProduct(product: Omit<Product, 'id'>): Promise<Product>
  deleteProduct(product: Product): Promise<Product>
}
