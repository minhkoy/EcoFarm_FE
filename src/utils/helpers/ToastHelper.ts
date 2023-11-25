import { toast } from 'sonner'
export const ToastHelper = {
  success: (message: string, description: string) => {
    toast.success(message, {
      description,
      dismissible: true,
    })
  },
  error: (message: string, description: string) => {
    toast.error(message, {
      description,
      dismissible: true,
    })
  },
  info: (message: string, description: string) => {
    toast.info(message, {
      description,
      dismissible: true,
    })
  },
}
