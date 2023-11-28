import Providers from '@/components/providers'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import { type AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Eco Farm</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default appWithTranslation(MyApp)

