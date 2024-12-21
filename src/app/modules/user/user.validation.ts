import { z } from 'zod';

/** Validation Schema for Creating new User */
const creationSchema = z.object({
	name: z
		.string({ required_error: 'Title is required!' })
		.trim()
		.min(2, { message: 'Name must be at least 2 characters long!' })
		.refine((value) => /^[A-Z]/.test(value), {
			message: 'Name must start with a capital letter',
		}),
	email: z.string().email(),
	password: z
		.string()
		.trim()
		.min(6, { message: 'Password must be at least 6 characters long!' })
		.max(20, { message: 'Password cannot be more than 20 characters!' }),
	role: z.enum(['user', 'admin']).default('user'),
	isBlocked: z.boolean().optional().default(false),
});

/** User Validation Schema */
export const userValidations = { creationSchema };
