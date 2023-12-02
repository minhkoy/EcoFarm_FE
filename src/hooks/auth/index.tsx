import { type User } from '@/@types'
import { loginApi } from '@/config/apis/authentication'
import { useMutation } from '@tanstack/react-query'

const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (params: User) =>
      loginApi({
        email: params.email,
        password: params.password,
      }),
  })
}

export { useLoginMutation }
