import { Form, FormField, FormInput, FormItem } from '@/components/ui/form'
import { fontSansStyle } from '@/config/lib/fonts'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
import { LINK_AUTH } from '@/utils/constants/links'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Tooltip,
  cn,
} from '@nextui-org/react'
import { capitalize } from 'lodash-es'
import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'], config)),
    },
  }
}

const ForgotPassScreen: NextPageWithLayout = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const schema = z.object({
    email: z
      .string()
      .min(1, {
        message: capitalize(t('auth:validation.email.isRequired')),
      })
      .email({
        message: capitalize(t('auth:validation.email.isValid')),
      }),
  })
  const rhf = useForm<z.infer<typeof schema>>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
  }

  return (
    <>
      <Tooltip
        content={capitalize(t('auth:back-to-login'))}
        placement='bottom-start'
        showArrow
        style={fontSansStyle}
      >
        <Button
          isIconOnly
          variant='light'
          radius='full'
          onClick={() => router.push(LINK_AUTH.LOGIN)}
        >
          <ArrowLeftIcon className='h-5 w-5 ' />
        </Button>
      </Tooltip>
      <CardHeader className='flex h-1/3 flex-col items-center justify-between pt-5 sm:h-fit'>
        <Image
          src='/assets/brands/EcoFarm.svg'
          alt='logo'
          width={150}
          height={150}
        />
      </CardHeader>
      <CardBody className='justify-center'>
        <Form {...rhf}>
          <form onSubmit={rhf.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={rhf.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    variant={'flat'}
                    isRequired
                    isClearable
                    label={capitalize(t('auth:field.your-email'))}
                    onClear={() => field.onChange('')}
                    autoCapitalize={'off'}
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
          color='primary'
          variant='solid'
          className='font-bold'
          fullWidth
        >
          {capitalize(t('common:reset-password'))}
        </Button>

        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 '>
            {capitalize(t('auth:not-have-account'))} ?
          </span>
          <Link href={LINK_AUTH.SIGN_UP} underline='hover' className=''>
            {cn(capitalize(t('common:sign-up')), t('common:now'))}
          </Link>
        </div>
      </CardFooter>
    </>
  )
}

ForgotPassScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassScreen
