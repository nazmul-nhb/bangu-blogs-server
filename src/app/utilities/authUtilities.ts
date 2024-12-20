import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { STATUS_CODES } from '../constants';
import type { BanguPayload } from '../types/interfaces';

/**
 * Utility function to hash password using `bcrypt`.
 * @param password Password to hash.
 * @returns Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
	try {
		return await bcrypt.hash(password, Number(configs.saltRounds));
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Error hashing password!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'password',
		);
	}
};

/**
 * Utility function to compare incoming password with hashed password.
 * @param rawPassword Incoming password from client.
 * @param hashedPassword Password from DB to be compared with.
 * @returns Boolean
 */
export const comparePassword = async (
	rawPassword: string,
	hashedPassword: string,
): Promise<boolean> => {
	try {
		return await bcrypt.compare(rawPassword, hashedPassword);
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Error comparing password!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'password',
		);
	}
};

/**
 * Utility function to generate jsonwebtoken.
 * @param payload Payload to be encoded in token.
 * @param secret Secret key for generating token.
 * @param expiresIn Expiry time.
 * @returns
 */
export const generateToken = (
	payload: BanguPayload,
	secret: string,
	expiresIn: string,
): string => {
	try {
		return jwt.sign(payload, secret, { expiresIn });
	} catch (_error) {
		throw new ErrorWithStatus(
			'Internal Server Error',
			'Cannot generate token!',
			STATUS_CODES.INTERNAL_SERVER_ERROR,
			'auth',
		);
	}
};

/**
 * Utility function to check if token is valid.
 * @param secret Secret key from `env` used for token generation.
 * @param token Token from client.
 * @returns Decoded token payload.
 */
export const verifyToken = (secret: string, token?: string): BanguPayload => {
	if (!token) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Invalid credentials!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	try {
		return jwt.verify(token, secret) as BanguPayload;
	} catch (_error) {
		throw new ErrorWithStatus(
			'Authorization Error',
			'Your token is invalid or expired!',
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}
};
