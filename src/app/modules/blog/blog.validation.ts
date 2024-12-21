import { z } from 'zod';

/** Validation schema for creating a new blog */
const creationSchema = z.object({
	title: z
		.string({ required_error: 'Title is required!' })
		.min(1, { message: 'Title cannot be empty!' }),
	content: z
		.string({ required_error: 'Content is required!' })
		.min(1, { message: 'Content cannot be empty!' }),
	isPublished: z.boolean().default(true).optional(),
});

const updateSchema = creationSchema.partial().strict();

export const blogValidations = { creationSchema, updateSchema };
