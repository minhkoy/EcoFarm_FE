import { type ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500'>
      {children}
    </div>
  )
}
