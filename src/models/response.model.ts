export type ResponseModel<T> = {
  status: number
  isSuccess: boolean
  successMessage: string
  correlationId: string
  errors: string[]
  validationErrors: ValidationError[]
  resultType: number
  message: string
  value: T
}

type ValidationError = {
  identifier: string
  errorMessage: string
}
