import {
  Form,
  FormCheckBox,
  FormField,
  FormInput,
  FormItem,
} from '@/components/ui/form'
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

const LoginScreen: NextPageWithLayout = () => {
  const { t } = useTranslation(['common', 'auth'])
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

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Card className='w-full animate-appearance-in sm:w-1/2 lg:w-1/3'>
      <CardHeader className='flex gap-2'>
        <h3 className='text-2xl font-semibold uppercase'>
          {capitalize(t('common:login'))}
        </h3>
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
                    placeholder={cn(
                      capitalize(t('common:username')),
                      t('common:or'),
                      t('auth:field.your-email'),
                    )}
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
                    placeholder={capitalize(t('auth:field.your-password'))}
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
                  <FormCheckBox {...field} color={'secondary'} size={'sm'}>
                    {capitalize(t('auth:field.remember-me'))}
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
          fullWidth
          className='font-bold'
        >
          {capitalize(t('common:submit'))}
        </Button>
        <Divider orientation='horizontal' />
        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 text-xs'>
            {capitalize(t('auth:not-have-account'))} ?
          </span>
          <Link href={LINK_AUTH.SIGN_UP} underline='hover' className=' text-xs'>
            {cn(capitalize(t('common:sign-up')), t('common:now'))}
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
