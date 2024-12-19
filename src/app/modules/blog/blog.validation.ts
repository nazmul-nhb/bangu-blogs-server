import { z } from 'zod';

/** Validation schema for creating a new blog */
const creationSchema = z.object({
	title: z.string().min(1, 'Title is required!'),
	content: z.string().min(1, 'Content is required!'),
	isPublished: z.boolean().default(true).optional(),
});

const updateSchema = creationSchema.partial().strict();

export const blogValidations = { creationSchema, updateSchema };
