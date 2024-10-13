export interface SuccessResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface ErrorResponse {
  success: boolean
  message: string
}

export const successResponse = <T>(
  data: T,
  message: string,
): SuccessResponse<T> => {
  return {
    success: true,
    data,
    message,
  }
}

export const errorResponse = (message: string): ErrorResponse => {
  return {
    success: false,
    message,
  }
}
