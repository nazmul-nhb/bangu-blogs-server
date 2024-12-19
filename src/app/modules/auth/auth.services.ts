import { User } from '../user/user.model';
import type { IUser } from '../user/user.types';

/**
 * Create a new user in MongoDB `user` collection.
 * @param payload User data from `req.body`.
 * @returns User object from MongoDB.
 */
const registerUserInDB = async (payload: IUser) => {
	const result = await User.create(payload);

	const { _id, name, email } = result.toObject();

	const user = { _id, name, email };

	return user;
};

export const authServices = { registerUserInDB };
