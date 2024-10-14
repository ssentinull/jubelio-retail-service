import { FastifyInstance } from 'fastify'
import { InventoryController } from '../controllers/inventory.controller'

export function registerInventoryRoutes(
  fastify: FastifyInstance,
  inventoryController: InventoryController,
) {
  fastify.post(
    '/inventories',
    inventoryController.createInventory.bind(inventoryController),
  )
  fastify.post(
    '/inventories/movements',
    inventoryController.moveInventory.bind(inventoryController),
  )
  fastify.get(
    '/inventories/:inventory_id/movements',
    inventoryController.getInventoryMovements.bind(inventoryController),
  )
}
