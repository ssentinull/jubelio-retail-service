const INVALID_PAYLOAD = new Error('invalid payload')
const DUPLICATE_ROW = new Error('data already exists')
const NOT_FOUND = new Error('data not found')
const INTERNAL_SERVER_ERROR = new Error('internal server error')
const INVALID_USERNAME_PASSWORD = new Error('invalid username and password')

export {
  INVALID_PAYLOAD,
  DUPLICATE_ROW,
  NOT_FOUND,
  INVALID_USERNAME_PASSWORD,
  INTERNAL_SERVER_ERROR,
}
