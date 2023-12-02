import { ThemeSwitcher } from '@/components/themeSwitcher'
import { ACCESS_TOKEN } from '@/utils/constants/enums'
import { LINK_AUTH } from '@/utils/constants/links'
import { getCookie } from 'cookies-next'
import { type GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const hasToken = getCookie(ACCESS_TOKEN, {
    req,
    res,
  })
  if (!hasToken) {
    return {
      redirect: {
        destination: LINK_AUTH.LOGIN,
        permanent: true,
      },
    }
  }
  return {
    props: {},
  }
}

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
    </div>
  )
}
