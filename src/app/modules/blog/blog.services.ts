import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import type { Types } from 'mongoose';
import type { IBlog } from './blog.types';
import type { BanguPayload } from '../../types/interfaces';

/**
 * Save a blog in MongoDB.
 * @param payload Blog data.
 * @param email Current user's email.
 * @returns Created blog.
 */
const saveBlogInDB = async (payload: IBlog, email?: string) => {
	if (!email) {
		throw new ErrorWithStatus(
			'Authorization Error',
			"You're not authorized!",
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const user = await User.validateUser(email);

	payload.author = user._id;

	const blog = await Blog.create(payload);

	return {
		_id: blog._id,
		title: blog.title,
		content: blog.content,
		author: {
			_id: user._id,
			name: user.name,
			email: user.email,
		},
	};
};

/**
 * Update a blog.
 * @param id MongoDB `ObjectId` for the blog.
 * @param payload Field(s) to update.
 * @returns Updated blog.
 */
const updateBlogInDB = async (
	id: Types.ObjectId,
	payload: Partial<IBlog>,
	user?: BanguPayload,
) => {
	const [existingBlog, currentUser] = await Promise.all([
		Blog.findBlogById(id),
		User.validateUser(user?.email),
	]);

	if (existingBlog.author.email !== currentUser.email) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'You do not own this blog!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, payload, {
		runValidators: true,
		new: true,
	});

	return updatedBlog;
};

/** Get all blogs from MongoDB */
const getAllBlogsFromDB = async () => {
	const blogs = await Blog.find();

	return blogs;
};

export const blogServices = { saveBlogInDB, updateBlogInDB, getAllBlogsFromDB };
