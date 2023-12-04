
import axiosClient from '@/config/lib/axiosConfig'
import { type LoginSchemaType } from '@/config/schema'
import { type ReponseUser } from '@/models/user.model'

const prefixUrl = '/Authentication/Login'

const loginApi = async (params: LoginSchemaType) =>
  axiosClient.post<ReponseUser>(prefixUrl, params)


export { loginApi }
