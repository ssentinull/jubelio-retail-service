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
}
