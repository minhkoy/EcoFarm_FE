export type User = {
  usernameOrEmail: string
  password: string
}

export type GetUsersResponse = {
  value: ReturnUSerData
  status: number
  isSuccess: boolean
  successMessage: string
  correlationId: string
  errors: string[]
  validationErrors: ValidationError[]
  resultType: number
  message: string
}

export type ReturnUSerData = {
  accountId: string
  fullName: string
  username: string
  email: string
  isEmailConfirmed: boolean
  accountType: string
  isActive: boolean
  lockedReason: string
  avatarUrl: string
  userId: string
  phoneNumber: string
  gender: string
  dateOfBirth: Date
  accessToken: string
}

export type ValidationError = {
  identifier: string
  errorMessage: string
  errorCode: string
  severity: number
}
