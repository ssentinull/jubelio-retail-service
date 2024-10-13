interface LoginRequest {
  email: string
  password: string
}

interface JwtUserClaims {
  id: number
  email: string
  name: string
}

export { LoginRequest, JwtUserClaims }
