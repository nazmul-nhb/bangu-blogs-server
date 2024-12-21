import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';
import type { Types } from 'mongoose';
import type { BanguPayload } from '../../types/interfaces';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';

/**
 * Block a user in MongoDB by updating the `isBlocked` field to `true`.
 * @param id User ID to block.
 * @param admin Current logged in user (admin) from decoded token.
 * @returns A message indicating the result of the operation.
 */
const blockUserInDB = async (id: Types.ObjectId, admin?: BanguPayload) => {
	if (admin?.role !== 'admin') {
		throw new ErrorWithStatus(
			'Authorization Error',
			'You do not have permission to block this user!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	const user = await User.findById(id);

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No user found with ID ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	if (user.isBlocked) {
		throw new ErrorWithStatus(
			'Already Blocked',
			`${user.name} is already blocked!`,
			STATUS_CODES.CONFLICT,
			'user',
		);
	}

	const result = await User.updateOne({ _id: id }, { isBlocked: true });

	if (result.modifiedCount < 1) {
		throw new ErrorWithStatus(
			'Bad Request',
			`User with ID ${id} cannot be blocked!`,
			STATUS_CODES.BAD_REQUEST,
			'user',
		);
	}

	return 'User blocked successfully!';
};

/**
 * Delete a blog from MongoDB for 'admin`.
 * @param id Blog ID to delete.
 * @param admin Current logged in user (admin) from decoded token.
 */
const deleteBlogFromDB = async (id: Types.ObjectId, admin?: BanguPayload) => {
	const currentUser = await User.validateUser(admin?.email);

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

export const adminServices = { blockUserInDB, deleteBlogFromDB };
