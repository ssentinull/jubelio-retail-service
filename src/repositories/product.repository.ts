import { IDatabaseAdapter } from '../entities/adapters/db.adapter'
import { IProductRepository } from '../entities/repositories/product.repository'
import { GetRequest, Product } from '../entities/models/product.model'

export class ProductRepository implements IProductRepository {
  private dbAdapter: IDatabaseAdapter

  constructor(dbAdapter: IDatabaseAdapter) {
    this.dbAdapter = dbAdapter
  }

  async getProducts(params: GetRequest): Promise<Product[]> {
    const query = `SELECT id, name, description, price, user_id, created_at, created_by FROM products WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`
    return this.dbAdapter.query<Product>(query, [
      params.userId,
      params.size,
      params.offset,
    ])
  }

  async getProductById(id: number): Promise<Product | null> {
    const query = `SELECT id, name, description, price, user_id, created_at, created_by FROM products WHERE id = $1`
    return this.dbAdapter.queryOne<Product>(query, [id])
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const query = `INSERT INTO products (name, description, price, user_id, created_at, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, description, price, user_id, created_at, created_by`
    return this.dbAdapter.insert<Product>(query, [
      product.name,
      product.description,
      product.price,
      product.user_id,
      product.created_at,
      product.created_by,
    ])
  }

  async deleteProduct(product: Product): Promise<Product> {
    const query = `UPDATE products SET deleted_at = $1, deleted_by = $2 WHERE id = $3 RETURNING id`
    return this.dbAdapter.update<Product>(query, [
      product.deleted_at,
      product.deleted_by,
      product.id,
    ])
  }
}
