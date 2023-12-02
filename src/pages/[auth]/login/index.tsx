import {
  Form,
  FormCheckBox,
  FormField,
  FormInput,
  FormItem,
} from '@/components/ui/form'
import { useLoginMutation } from '@/hooks/auth'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
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
import { capitalize, debounce } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'], config)),
    },
  }
}

const LoginScreen: NextPageWithLayout = () => {
  const { t } = useTranslation(['common', 'auth'])
  const router = useRouter()
  // ==================== React Hook Form ====================
  const schema = z.object({
    email: z.string().min(1, {
      message: capitalize(t('auth:validation.email.isRequired')),
    }),
    password: z
      .string()
      .min(6, {
        message: capitalize(
          t('auth:validation.password.min', {
            min: 6,
          }),
        ),
      })
      .max(20, {
        message: capitalize(
          t('auth:validation.password.max', {
            max: 20,
          }),
        ),
      }),
    isRemember: z.boolean().optional().default(false),
  })
  const form = useForm<z.infer<typeof schema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      isRemember: false,
    },
  })
  const { mutateAsync, isPending } = useLoginMutation()

  async function onSubmit(values: z.infer<typeof schema>) {
    await mutateAsync({
      email: values.email,
      password: values.password,
    })
    ToastHelper.success(t('common:success'), t('auth:login.success'), 500)
    debounce(() => {
      void router.replace(COMMON_LINK.DASHBOARD)
    }, 1000)
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
              name='email'
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
