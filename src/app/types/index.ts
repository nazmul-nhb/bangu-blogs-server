import type { STATUS_CODES } from '../constants';

export type TCollection = 'N/A' | 'User' | 'Blog';

export type TUserRole = 'user' | 'admin';

export type TOperation = 'create' | 'get' | 'update' | 'delete';

export type TResponseDetails = { message: string; statusCode: number };

export type TErrorName =
	| 'ValidationError'
	| 'ZodValidationError'
	| 'NotFoundError'
	| 'AuthenticationError'
	| 'AuthorizationError'
	| 'InternalServerError';

export type TStatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
