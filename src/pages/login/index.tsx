import { Form, FormField, FormInput } from '@/components/ui/form'
import loginSchema, { type LoginSchema } from '@/utils/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
export default function LoginScreen() {
  const form = useForm<LoginSchema>({
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
      <Card className='w-[300px] max-w-lg rounded-md'>
        <CardHeader className='flex gap-2'>
          <h3 className='text-2xl font-semibold'>Welcome to Eco Farm</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormInput
                    type='email'
                    variant='flat'
                    isRequired
                    isClearable
                    placeholder='Your email account'
                    {...field}
                  />
                )}
              />
            </form>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
