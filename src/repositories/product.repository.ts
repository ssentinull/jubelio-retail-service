import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IProductRepository } from '../entities/repositories/product.repository'
import { Product } from '../entities/models/product.model'

export class ProductRepository implements IProductRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const createdAt = new Date()
    const query = `INSERT INTO products (name, description, price, user_id, created_at, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, description, price, user_id, created_at, created_by`
    return this.dbAdapter.insert<Product>(query, [
      product.name,
      product.description,
      product.price,
      product.user_id,
      createdAt,
      product.created_by,
    ])
  }
}
