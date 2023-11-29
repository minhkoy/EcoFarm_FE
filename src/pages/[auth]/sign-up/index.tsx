import { Form, FormField, FormInput, FormItem } from '@/components/ui/form'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
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
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], config)),
    },
  }
}

const SignUpScreen: NextPageWithLayout = () => {
  const { t } = useTranslation()
  // ==================== React Hook Form ====================
  const signUpSchema = z.object({
    username: z.string().min(1, { message: t('Username is required') }),
    email: z.string().min(1, { message: t('Email is required') }),
    password: z
      .string()
      .min(6, {
        message: t('Password must be at least 6 characters long'),
      })
      .max(20, {
        message: t('Password must be less than 20 characters long'),
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
    <Card className='w-full animate-appearance-in sm:w-1/3'>
      <CardHeader className='flex gap-2'>
        <h3 className='text-2xl font-semibold'>{t('Sign up')}</h3>
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
                    placeholder={t('Your username')}
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
                    placeholder={t('Your email')}
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
                    placeholder={t('Your password')}
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
        >
          {t('Submit')}
        </Button>
        <Divider orientation='horizontal' />
        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 text-xs'>
            {t('Already has an account')} ?
          </span>
          <Link href='/auth/login' underline='hover' className=' text-xs'>
            {cn(t('Login'), t('now'))}
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
