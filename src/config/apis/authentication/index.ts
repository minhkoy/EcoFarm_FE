import { type GetUsersResponse, type User } from '@/@types'
import axiosClient from '@/config/lib/axiosConfig'

const prefixUrl = '/auth/login'

const loginApi = async (params: User) =>
  axiosClient.post<GetUsersResponse>(prefixUrl, params)

export { loginApi }
