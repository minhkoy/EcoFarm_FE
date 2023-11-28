import { Form, FormField, FormInput, FormItem } from '@/components/ui/form'
import loginSchema, { type LoginSchema } from '@/utils/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { type ElementType } from 'react'
import { useForm } from 'react-hook-form'

const RHFDevTool: ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
)
export default function LoginScreen() {
  const form = useForm<LoginSchema>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: LoginSchema) {
    console.log(values)
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500'>
      <Card className='w-1/3 min-w-[350px]'>
        <CardHeader className='flex gap-2'>
          <h3 className='text-2xl font-semibold'>Login to Eco Farm</h3>
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
                      placeholder='Your user or email account'
                      label={'Email'}
                      onClear={() => field.onChange('')}
                      autoFocus={true}
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
                      placeholder='Your password'
                      onClear={() => field.onChange('')}
                    />
                  </FormItem>
                )}
              />

              <div className='w-100 flex items-center justify-center'>
                <Button
                  type='submit'
                  color='secondary'
                  variant='flat'
                  className='font-bold'
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardBody>
      </Card>
      <RHFDevTool placement='bottom-left' control={form.control} />
    </div>
  )
}
