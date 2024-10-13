interface Product {
  id: number
  name: string
  description: string
  price: number
  user_id: number
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  deleted_at: string
  deleted_by: string
}

interface DeleteRequest {
  id: number
}

class GetRequest {
  userId: number
  page: number
  size: number
  offset: number

  constructor(userId: number, page: number, size: number) {
    this.userId = userId
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

export { Product, DeleteRequest, GetRequest }
