import { Form, FormField, FormInput, FormItem } from '@/components/ui/form'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
import { LINK_AUTH } from '@/utils/constants/links'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  cn,
} from '@nextui-org/react'
import { capitalize } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'], config)),
    },
  }
}

const SignUpScreen: NextPageWithLayout = () => {
  const { t } = useTranslation(['common', 'auth'])
  // ==================== React Hook Form ====================
  const signUpSchema = z.object({
    username: z
      .string()
      .min(1, {
        message: capitalize(t('auth:validation.username.isRequired')),
      }),
    email: z
      .string()
      .min(1, { message: capitalize(t('auth:validation.email.isRequired')) }),
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
  })
  const rhf = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log(values)
  }

  return (
    <Card className='w-full animate-appearance-in sm:w-1/2 lg:w-1/3'>
      <CardHeader className='flex gap-2'>
        <h3 className='text-2xl font-semibold'>
          {capitalize(t('common:sign-up'))}
        </h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form {...rhf}>
          <form onSubmit={rhf.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={rhf.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='text'
                    variant='flat'
                    isRequired
                    isClearable
                    placeholder={capitalize(t('auth:field.your-username'))}
                    label={'Username'}
                    onClear={() => field.onChange('')}
                    autoComplete={'off'}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='text'
                    variant='flat'
                    isRequired
                    isClearable
                    placeholder={capitalize(t('auth:field.your-email'))}
                    label={'Email'}
                    onClear={() => field.onChange('')}
                    autoComplete={'off'}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='password'
                    variant='flat'
                    isRequired
                    isClearable
                    label={'Password'}
                    placeholder={capitalize(t('auth:field.your-password'))}
                    onClear={() => field.onChange('')}
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardBody>
      <CardFooter className='flex-col gap-3'>
        <Button
          onClick={rhf.handleSubmit(onSubmit)}
          color='secondary'
          variant='flat'
          className='font-bold'
          fullWidth
        >
          {capitalize(t('common:submit'))}
        </Button>
        <Divider orientation='horizontal' />
        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 text-xs'>
            {capitalize(t('auth:have-account'))} ?
          </span>
          <Link href={LINK_AUTH.LOGIN} underline='hover' className='text-xs'>
            {cn(capitalize(t('common:login')), t('common:now'))}
          </Link>
        </div>
      </CardFooter>
      {/* <DevT i18nIsDynamicList placement='bottom-left' control={rhf.control} /> */}
    </Card>
  )
}

SignUpScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUpScreen
