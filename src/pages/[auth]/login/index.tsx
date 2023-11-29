import {
  Form,
  FormCheckBox,
  FormField,
  FormInput,
  FormItem,
} from '@/components/ui/form'
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

const LoginScreen: NextPageWithLayout = () => {
  const { t } = useTranslation()
  // ==================== React Hook Form ====================
  const schema = z.object({
    email: z.string().min(1, { message: t('Email is required') }),
    password: z
      .string()
      .min(6, {
        message: t('Password must be at least 6 characters long'),
      })
      .max(20, {
        message: t('Password must be less than 20 characters long'),
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

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Card className='w-full animate-appearance-in sm:w-1/3'>
      <CardHeader className='flex gap-2'>
        <h3 className='text-2xl font-semibold'>{t('Welcome to Eco Farm')}</h3>
      </CardHeader>
      <Divider />
      <CardBody>
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
                    placeholder={t('Your user or email account')}
                    label={'Email'}
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
                    label={'Password'}
                    placeholder={t('Your password')}
                    onClear={() => field.onChange('')}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isRemember'
              render={({ field }) => (
                <FormItem>
                  <FormCheckBox {...field} color={'secondary'}>
                    {t('Remember me')}
                  </FormCheckBox>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardBody>
      <CardFooter className='flex-col gap-3'>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          color='secondary'
          variant='flat'
          className='font-bold'
        >
          {t('Submit')}
        </Button>
        <Divider orientation='horizontal' />
        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 text-xs'>
            {t("Don't have an account")} ?
          </span>
          <Link href='/auth/sign-up' underline='hover' className=' text-xs'>
            {cn(t('Sign up'), t('now'))}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
LoginScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default LoginScreen
