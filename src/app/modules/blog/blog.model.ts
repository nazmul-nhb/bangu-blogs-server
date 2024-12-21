import { Schema, model } from 'mongoose';
import type { Query, Types } from 'mongoose';
import type { IBlogDoc, IBlogModel } from './blog.types';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

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

blogSchema.statics.findBlogById = async function (id: Types.ObjectId) {
	if (!id) {
		throw new ErrorWithStatus(
			'Bad Request',
			'Please provide a valid ID!',
			STATUS_CODES.BAD_REQUEST,
			'blog',
		);
	}

	const blog = await this.findById(id);

	if (!blog) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No blog found with ID ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'blog',
		);
	}

	return blog;
};

export const Blog = model<IBlogDoc, IBlogModel>('Blog', blogSchema);
