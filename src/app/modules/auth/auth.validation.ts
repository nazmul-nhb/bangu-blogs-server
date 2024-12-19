import { z } from 'zod';

/** Zod schema to validate login credentials. */
const loginSchema = z.object({
	email: z.string().trim().email(),
	password: z
		.string()
		.trim()
		.min(6, { message: 'Password must be at least 6 characters long!' })
		.max(20, { message: 'Password cannot be more than 20 characters!' }),
});

export const authValidations = { loginSchema };
