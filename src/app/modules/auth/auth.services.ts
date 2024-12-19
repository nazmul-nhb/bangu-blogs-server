import configs from '../../configs';
import { User } from '../user/user.model';
import { STATUS_CODES } from '../../constants';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { comparePassword, generateToken } from '../../utilities/authUtilities';
import type { BanguPayload } from '../../types/interfaces';
import type { ILoginCredentials, IToken, IUser } from '../user/user.types';

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

/**
 * Login user.
 * @param payload Login credentials.
 * @returns Token as object.
 */
const loginUser = async (payload: ILoginCredentials): Promise<IToken> => {
	// checking if the user is exist
	const user = await User.validateUser(payload.email);

	//checking if the password is correct

	const passwordMatched = await comparePassword(
		payload?.password,
		user?.password,
	);

	if (!passwordMatched) {
		throw new ErrorWithStatus(
			'AuthorizationError',
			`Password did not match!`,
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	//create token and sent to the  client
	const jwtPayload: BanguPayload = {
		email: user.email,
		role: user.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		configs.accessSecret,
		configs.accessExpireTime,
	);

	// const refreshToken = generateToken(
	// 	jwtPayload,
	// 	configs.refreshSecret,
	// 	configs.refreshExpireTime,
	// );

	return { token: accessToken };
};

export const authServices = { registerUserInDB, loginUser };
