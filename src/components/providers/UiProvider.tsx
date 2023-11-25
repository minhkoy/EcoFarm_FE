import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { type ReactNode } from 'react'

export default function UiProvider({ children }: { children: ReactNode }) {
  const navigate = useRouter()
  return (
    <NextUIProvider navigate={navigate.push}>
      <ThemeProvider attribute='class' storageKey='eco-farm-theme'>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}
