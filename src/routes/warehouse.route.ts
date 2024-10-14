import { FastifyInstance } from 'fastify'
import { WarehouseController } from '../controllers/warehouse.controller'

export function registerWarehouseRoutes(
  fastify: FastifyInstance,
  warehouseController: WarehouseController,
) {
  fastify.post(
    '/warehouses',
    warehouseController.createWarehouse.bind(warehouseController),
  )

  fastify.get(
    '/warehouses/:warehouse_id/inventories',
    warehouseController.getWarehouseInventories.bind(warehouseController),
  )
}
