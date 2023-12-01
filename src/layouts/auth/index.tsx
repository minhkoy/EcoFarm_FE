import { Card } from '@nextui-org/react'
import { type ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#2A9476] to-[#195658]'>
      <Card className='h-screen w-full max-w-2xl animate-appearance-in rounded-none p-3 sm:rounded-md md:h-fit md:w-1/2 md:max-w-lg'>
        {children}
      </Card>
    </div>
  )
}
