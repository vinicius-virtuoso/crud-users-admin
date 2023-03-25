import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid Email'),
  password: z.string(),
  admin: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),
})
