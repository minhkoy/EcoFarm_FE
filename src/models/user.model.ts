import { type GENDER } from '@/utils/constants/enums'
import { type AccountModel } from './account.model'
import { type ResponseModel } from './response.model'

type Address = {
  id: string
  userId: string
  description: string
  receiverName: string
  phone: string
  isPrimary: boolean
  createAt: Date
  lastUpdateAt: Date
}

export type UserModel = AccountModel & {
  id: string
  phoneNumber: string
  gender?: keyof typeof GENDER
  dob?: Date
  addresses?: Address[]
}

export type ReponseUser = ResponseModel<UserModel>
