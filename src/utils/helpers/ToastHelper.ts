import { toast } from 'sonner'
export const ToastHelper = {
  success: (message: string, description: string, duration?: number) => {
    toast.success(message, {
      description,
      dismissible: true,
      duration,
    })
  },
  error: (message: string, description: string, duration?: number) => {
    toast.error(message, {
      description,
      dismissible: true,
      duration,
    })
  },
  info: (message: string, description: string, duration?: number) => {
    toast.info(message, {
      description,
      dismissible: true,
      duration,
    })
  },
}
