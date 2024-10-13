import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  DbHost:
    process.env.DB_HOST ??
    (() => {
      throw new Error('DB_HOST is required')
    })(),
  DbPort:
    process.env.DB_PORT ??
    (() => {
      throw new Error('DB_PORT is required')
    })(),
  DbName:
    process.env.DB_NAME ??
    (() => {
      throw new Error('DB_NAME is required')
    })(),
  DbUsername:
    process.env.DB_USERNAME ??
    (() => {
      throw new Error('DB_USERNAME is required')
    })(),
  DbPasword:
    process.env.DB_PASSWORD ??
    (() => {
      throw new Error('DB_PASWORD is required')
    })(),
  JwtSecretKey:
    process.env.JWT_SECRET_KEY ??
    (() => {
      throw new Error('JWT_SECRET_KEY is required')
    })(),
}
