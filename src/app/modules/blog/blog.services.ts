import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import type { IBlog } from './blog.types';

/** Save a blog in MongoDB */
const saveBlogInDB = async (payload: IBlog, email?: string) => {
	if (!email) {
		throw new ErrorWithStatus(
			'Authorization Error',
			"You're not authorized",
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

/** Get all blogs from MongoDB */
const getAllBlogsFromDB = async () => {
	const blogs = await Blog.find();

	return blogs;
};

export const blogServices = { saveBlogInDB, getAllBlogsFromDB };
