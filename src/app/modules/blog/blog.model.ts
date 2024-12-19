import { Schema, model } from 'mongoose';
import type { Query } from 'mongoose';
import type { IBlogDoc } from './blog.types';

const blogSchema = new Schema<IBlogDoc>(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		content: {
			type: String,
			trim: true,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			trim: true,
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

blogSchema.pre(/^find/, function (next) {
	const query = this as Query<IBlogDoc, IBlogDoc>;

	query
		.find({ isPublished: { $eq: true } })
		.select('-createdAt -updatedAt -isPublished')
		.populate('author', 'name email');

	next();
});

export const Blog = model<IBlogDoc>('Blog', blogSchema);
