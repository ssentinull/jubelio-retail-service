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

class GetRequest {
  inventory_id: number
  product_id: number
  warehouse_id: number
  page: number
  size: number
  offset: number

  constructor(
    inventory_id: number,
    product_id: number,
    warehouse_id: number,
    page: number,
    size: number,
  ) {
    this.inventory_id = inventory_id
    this.product_id = product_id
    this.warehouse_id = warehouse_id
    this.page = page
    this.size = size
    this.offset = 0

    this.validate()
  }

  validate() {
    if (this.page <= 0) {
      this.page = 1
    }

    if (this.size > 25 || this.size <= 0) {
      this.size = 25
    }

    this.offset = (this.page - 1) * this.size
  }
}

export { Inventory, InventoryMovement, MoveRequest, GetRequest }
