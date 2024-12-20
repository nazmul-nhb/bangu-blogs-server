import type { STATUS_CODES } from '../constants';

export type TCollection = 'N/A' | 'User' | 'Blog';

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

export type TStatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
