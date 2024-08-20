import { z } from 'zod'

export const createUserDto = z.object({
	name: z.string().min(3, 'Name must have min 3 symbol').max(12),
	email: z.string().min(5, 'Email must have min 5 symbol').max(24),
	password: z.string().min(5, 'Password must have min 5 symbol').max(64),
})
