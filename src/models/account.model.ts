export type AccountModel = {
  accountId: string
  fullName: string
  username: string
  email: string
  password: string
  isEmailConfirmed?: boolean
  accountType: string
  isActive?: boolean
  lockedReason?: string
  avatarUrl?: string
  accessToken?: string
}
