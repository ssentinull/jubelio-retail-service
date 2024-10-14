BEGIN;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price FLOAT NOT NULL DEFAULT 0.0,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  updated_by VARCHAR(255),
  deleted_at TIMESTAMP,
  deleted_by VARCHAR(255),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE warehouses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  updated_by VARCHAR(255),
  deleted_at TIMESTAMP,
  deleted_by VARCHAR(255),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE warehouse_inventories (
  id SERIAL PRIMARY KEY,
  stock INTEGER NOT NULL DEFAULT 0,
  product_id INTEGER NOT NULL,
  warehouse_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  updated_by VARCHAR(255),
  deleted_at TIMESTAMP,
  deleted_by VARCHAR(255),
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
  CONSTRAINT fk_warehouse FOREIGN KEY(warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE inventory_movements (
  id SERIAL PRIMARY KEY,
  movement_type VARCHAR(50) NOT NULL,
  movement_size INTEGER NOT NULL DEFAULT 0,
  inventory_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  CONSTRAINT fk_inventory FOREIGN KEY(inventory_id) REFERENCES warehouse_inventories(id)
);

COMMIT;