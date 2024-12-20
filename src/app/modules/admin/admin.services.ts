import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';
import type { Types } from 'mongoose';
import type { BanguPayload } from '../../types/interfaces';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

/**
 * Delete a blog from MongoDB for 'admin`.
 * @param id Blog ID to delete.
 * @param user Current logged in user.
 */
const deleteBlogFromDB = async (id: Types.ObjectId, user?: BanguPayload) => {
	const currentUser = await User.validateUser(user?.email);

	if (currentUser.role !== 'admin') {
		throw new ErrorWithStatus(
			'Authorization Error',
			'You do not have permission to delete this blog!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const result = await Blog.deleteOne({ _id: id });

	if (result.deletedCount < 1) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No blog found with ID ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'blog',
		);
	}
};

export const adminServices = { deleteBlogFromDB };
