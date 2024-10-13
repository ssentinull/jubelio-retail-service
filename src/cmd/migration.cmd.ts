import * as fs from 'fs'
import * as path from 'path'
import { db } from '../adapters/db.adapter'

const readSqlFile = (filePath: string): string => {
  return fs.readFileSync(filePath).toString()
}

const runMigration = async (filePath: string) => {
  const sql = readSqlFile(filePath)
  try {
    await db.none(sql)
    console.log(`Migration ${filePath} ran successfully.`)
  } catch (error) {
    console.error(`Error running migration ${filePath}:`, error)
    process.exit(1)
  }
}

const getSqlFiles = (directory: string, filter: 'up' | 'down'): string[] => {
  return fs
    .readdirSync(directory)
    .filter(file => file.endsWith(`${filter}.sql`))
    .sort()
}

const runAllMigrationsUp = async () => {
  const migrationDir = path.join(process.cwd(), '/db/migrations')
  const sqlFiles = getSqlFiles(migrationDir, 'up')

  for (const file of sqlFiles) {
    const filePath = path.join(migrationDir, file)
    await runMigration(filePath)
  }
}

const runAllMigrationsDown = async () => {
  const migrationDir = path.join(process.cwd(), '/db/migrations')
  const sqlFiles = getSqlFiles(migrationDir, 'down').reverse()

  for (const file of sqlFiles) {
    const filePath = path.join(migrationDir, file)
    await runMigration(filePath)
  }
}

const migrate = async () => {
  const direction = process.argv[2]

  if (direction === 'up') {
    await runAllMigrationsUp()
  } else if (direction === 'down') {
    await runAllMigrationsDown()
  } else {
    console.error("Invalid argument. Use 'up' or 'down'.")
  }

  process.exit(1)
}

migrate()
