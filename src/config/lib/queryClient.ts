import { ToastHelper } from '@/utils/helpers/ToastHelper'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  keepPreviousData,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      refetchIntervalInBackground: true,
      placeholderData: keepPreviousData,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      ToastHelper.error(err.name, err.message)
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      ToastHelper.error(err.name, err.message)
    },
  }),
})
