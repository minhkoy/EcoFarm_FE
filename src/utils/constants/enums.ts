export const ACCOUNT_TYPE = {
  SA: 'SuperAdmin',
  ADMIN: 'Admin',
  SELLER: 'Seller',
  CUSTOMER: 'Customer',
} as const

export const ACCESS_TOKEN = 'accessToken'

export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHERS: 'OTHERS',
} as const
