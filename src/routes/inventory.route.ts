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
}
