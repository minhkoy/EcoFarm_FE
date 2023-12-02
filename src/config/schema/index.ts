import { ACCOUNT_TYPE } from '@/utils/constants/enums'
import { capitalize } from 'lodash-es'
import { type TFunction } from 'next-i18next'
import { z } from 'zod'

export const createLoginSchema = <T extends TFunction>(t: T) => {
  return z.object({
    usernameOrEmail: z.string().min(1, {
      message: capitalize(t('auth:validation.usernameOrEmail.isRequired')),
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
}

export const createSignUpSchema = <T extends TFunction>(t: T) => {
  return z
    .object({
      username: z.string().min(1, {
        message: capitalize(t('auth:validation.username.isRequired')),
      }),
      email: z
        .string()
        .min(1, { message: capitalize(t('auth:validation.email.isRequired')) })
        .email({
          message: capitalize(t('auth:validation.email.isValid')),
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
      confirmPassword: z
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
      accountType: z.nativeEnum(ACCOUNT_TYPE, {
        required_error: capitalize(
          t('auth:validation.account-type.isRequired'),
        ),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: capitalize(t('auth:validation.password.notMatch')),
      path: ['confirmPassword'],
    })
}

export const createForgotPasswordSchema = <T extends TFunction>(t: T) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: capitalize(t('auth:validation.email.isRequired')) })
      .email({
        message: capitalize(t('auth:validation.email.isValid')),
      }),
  })
}

export type LoginSchemaType = z.infer<ReturnType<typeof createLoginSchema>>
export type SignUpSchemaType = z.infer<ReturnType<typeof createSignUpSchema>>
export type ForgotPasswordSchemaType = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>
