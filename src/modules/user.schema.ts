import z from 'zod'

export const UserSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    email: z.email({ error: 'Email không đúng định dạng' }),
    password: z.string().min(8).max(32),
    createdAt: z.iso.datetime(),
  })
  .strict()

export const CreateUserBodySchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
}).strict()

export const UpdateUserBodySchema = CreateUserBodySchema.partial()
