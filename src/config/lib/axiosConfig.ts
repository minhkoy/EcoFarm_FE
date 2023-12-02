import { env } from '@/env'
import { ACCESS_TOKEN, ERROR_CODES } from '@/utils/constants/enums'
import { ToastHelper } from '@/utils/helpers/ToastHelper'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { i18n } from 'next-i18next'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  if (getCookie(ACCESS_TOKEN)) {
    config.headers.Authorization = `Bearer ${getCookie(ACCESS_TOKEN)}`
  }
  // Log the request method and URL
  console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`)

  // Log the request headers
  console.log('Headers:', config.headers)

  // Log the request data
  if (config.data) {
    console.log('Data:', config.data)
  }

  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === ERROR_CODES.UNAUTHORIZED) {
        ToastHelper.error(
          i18n?.t('error:access-expired.title') ?? 'Error',
          i18n?.t('error:access-expired.description') ?? 'Access expired',
        )
      }
      if (error.response?.status === ERROR_CODES.FORBIDDEN) {
        ToastHelper.error(
          i18n?.t('error:access-denied.title') ?? 'Error',
          i18n?.t('error:access-denied.description') ?? 'Access denied',
        )
      }
    } else {
      ToastHelper.error(
        i18n?.t('error:default-error.title') ?? 'Error',
        i18n?.t('error:default-error.description') ??
          'An unexpected error occurred',
      )
    }
    throw error
  },
)

export default axiosClient
