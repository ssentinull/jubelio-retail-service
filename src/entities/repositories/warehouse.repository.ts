import { Warehouse } from '../models/warehouse.model'

export interface IWarehouseRepository {
  createWarehouse(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse>
  getWarehouseById(id: number): Promise<Warehouse | null>
}
