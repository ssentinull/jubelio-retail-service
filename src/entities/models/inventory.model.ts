interface Inventory {
  id: number
  stock: number
  product_id: number
  warehouse_id: number
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  deleted_at: string
  deleted_by: string
}

interface InventoryMovement {
  id: number
  movement_type: string
  movement_size: number
  inventory_id: number
  created_at: string
  created_by: string
}

interface MoveRequest {
  id: number
  movement_type: string
  movement_size: number
  inventory_id: number
}

interface GetRequest {
  inventory_id: number
  product_id: number
  warehouse_id: number
}

export { Inventory, InventoryMovement, MoveRequest, GetRequest }
