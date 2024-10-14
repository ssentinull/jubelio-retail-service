import { Inventory } from './inventory.model'

interface Warehouse {
  id: number
  name: string
  user_id: number
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  deleted_at: string
  deleted_by: string
}

interface WarehouseInventory {
  id: number
  name: string
  user_id: number
  created_at: string
  created_by: string
  inventories: Inventory[]
}

interface GetInventoriesRequest {
  warehouse_id: number
  user_id: number
}

export { Warehouse, WarehouseInventory, GetInventoriesRequest }
