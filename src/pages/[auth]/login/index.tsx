import { type User } from '@/@types'
import {
  Form,
  FormCheckBox,
  FormField,
  FormInput,
  FormItem,
} from '@/components/ui/form'
import { loginApi } from '@/config/apis/authentication'
import { createLoginSchema, type LoginSchemaType } from '@/config/schema'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
import { ACCESS_TOKEN } from '@/utils/constants/enums'
import { COMMON_LINK, LINK_AUTH } from '@/utils/constants/links'
import { ToastHelper } from '@/utils/helpers/ToastHelper'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  cn,
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { getCookie, setCookie } from 'cookies-next'
import { capitalize } from 'lodash-es'
import { type GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export async function getServerSideProps({
  locale,
  req,
  res,
}: GetServerSidePropsContext) {
  const hasCookie = getCookie(ACCESS_TOKEN, {
    res,
    req,
  })
  if (hasCookie) {
    return {
      redirect: {
        destination: COMMON_LINK.DASHBOARD,
        permanent: true,
      },
    }
  }
  if (locale)
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'auth'], config)),
      },
    }
}

const LoginScreen: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const schema = useMemo(() => createLoginSchema(t), [t])
  // ==================== React Hook Form ====================
  const form = useForm<LoginSchemaType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      isRemember: false,
    },
  })
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (params: LoginSchemaType) => loginApi(params),
    onSuccess: (responseData) => {
      ToastHelper.success(
        capitalize(t('common:success')),
        capitalize(t('auth:login.success')),
      )
      setCookie(ACCESS_TOKEN, responseData?.data.value.accessToken)
      void router.replace(COMMON_LINK.DASHBOARD)
    },
  })

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data)
  }

  return (
    <>
      <CardHeader className='flex h-1/3 flex-col items-center justify-between pt-5 sm:h-fit'>
        <h3 className='text-center text-3xl font-bold leading-8 text-secondary sm:leading-relaxed'>
          {cn(
            capitalize(t('common:experience')),
            t('common:and'),
            t('common:explore'),
          )}
          <br />
          Eco Farm
        </h3>
        <Image
          src='/assets/brands/EcoFarm.svg'
          alt='logo'
          width={150}
          height={150}
        />
      </CardHeader>
      <CardBody className='justify-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='usernameOrEmail'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='text'
                    variant='flat'
                    isRequired
                    isClearable
                    label={cn(
                      capitalize(t('common:username')),
                      t('common:or'),
                      t('auth:field.your-email'),
                    )}
                    onClear={() => field.onChange('')}
                    autoComplete={'off'}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='password'
                    variant='flat'
                    isRequired
                    isClearable
                    label={capitalize(t('auth:field.your-password'))}
                    onClear={() => field.onChange('')}
                  />
                </FormItem>
              )}
            />
            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='isRemember'
                render={({ field }) => (
                  <FormItem>
                    <FormCheckBox {...field} color={'primary'}>
                      {capitalize(t('auth:field.remember-me'))}
                    </FormCheckBox>
                  </FormItem>
                )}
              />
              <Link href={LINK_AUTH.FORGOT_PASSWORD} className='text-primary'>
                {capitalize(t('auth:field.forgot-password'))} ?
              </Link>
            </div>
          </form>
        </Form>
      </CardBody>
      <CardFooter className='flex-col gap-5 pb-7'>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          color='primary'
          variant='solid'
          fullWidth
          className='font-bold'
          isLoading={isPending}
          disabled={isPending}
        >
          {capitalize(t('common:login'))}
        </Button>
        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 '>
            {capitalize(t('auth:not-have-account'))} ?
          </span>
          <Link href={LINK_AUTH.SIGN_UP} underline='hover' className=' '>
            {cn(capitalize(t('common:sign-up')), t('common:now'))}
          </Link>
        </div>
      </CardFooter>
    </>
  )
}
LoginScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default LoginScreen
