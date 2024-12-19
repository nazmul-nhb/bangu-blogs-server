import type { STATUS_CODES } from '../constants';

export type TCollection = 'N/A' | 'User' | 'Blog';

export type TUserRole = 'user' | 'admin';

export type TMethod =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'HEAD'
	| 'OPTIONS'
	| 'OK';

export type TResponseDetails = { message: string; statusCode: number };

export type TErrorName =
	| 'ValidationError'
	| 'ZodValidationError'
	| 'NotFoundError'
	| 'MethodNotAllowedError'
	| 'AuthenticationError'
	| 'AuthorizationError'
	| 'InternalServerError';

export type TStatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
