import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
})

const fontMono = FontMono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
})

const nextFonts = `${fontSans.variable} ${fontMono.variable} `

export default nextFonts
