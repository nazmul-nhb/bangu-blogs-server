import { z } from 'zod';

/** Validation schema for creating a new blog */
const creationSchema = z.object({
	title: z.string().min(1, 'Title is required!'),
	content: z.string().min(1, 'Content is required!'),
	author: z.string().min(1, 'Author is required!'),
	isPublished: z.boolean().default(false),
});

const updateSchema = creationSchema.omit({ author: true }).partial().strict();

export const blogValidation = { creationSchema, updateSchema };
