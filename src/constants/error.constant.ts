const INVALID_PAYLOAD = new Error('invalid payload')
const INVALID_USERNAME_PASSWORD = new Error('invalid username and password')
const DUPLICATE_DATA = new Error('data already exists')
const DATA_NOT_FOUND = new Error('data not found')
const INTERNAL_SERVER_ERROR = new Error('internal server error')
const ENUM_NOT_DEFINED = new Error('enum not defined')
const INVALID_LOGIC = new Error('invalid business logic')

export {
  INVALID_PAYLOAD,
  DUPLICATE_DATA,
  DATA_NOT_FOUND,
  INVALID_USERNAME_PASSWORD,
  INTERNAL_SERVER_ERROR,
  ENUM_NOT_DEFINED,
  INVALID_LOGIC,
}
