import bcrypt from 'bcrypt';
import configs from '../configs';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { STATUS_CODES } from '../constants';

/**
 * Utility function to hash password using `bcrypt`.
 * @param password Password to hash.
 * @returns Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
	try {
		const hashedPassword = await bcrypt.hash(
			password,
			Number(configs.saltRounds),
		);

		return hashedPassword;
	} catch (_error) {
		throw new ErrorWithStatus(
			'InternalServerError',
			'Error hashing password!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'password',
		);
	}
};
