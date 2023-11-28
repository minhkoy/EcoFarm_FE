import { z } from 'zod'

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(20, {
      message: 'Password must be less than 20 characters long',
    }),
})

export default schema
export type LoginSchema = z.infer<typeof schema>
