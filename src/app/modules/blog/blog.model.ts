import { Schema, model } from 'mongoose';
import { IBlog } from './blog.types';

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, trim: true, required: true },
		content: { type: String, trim: true, required: true },
		author: { type: Schema.Types.ObjectId, trim: true, required: true },
		isPublished: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Blog = model<IBlog>('Blog', blogSchema);

export { Blog, IBlog };
