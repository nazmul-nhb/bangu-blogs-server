import type { TUserRole } from '.';
import type { Router } from 'express';
import type { RequestHandler } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface IDuplicateError {
	errorResponse: {
		index: number;
		code: number;
		errmsg: string;
		keyPattern: Record<string, number>;
		keyValue: Record<string, string>;
	};
	index: number;
	code: number;
	keyPattern: Record<string, number>;
	keyValue: Record<string, string>;
}

export interface IParserError {
	expose: boolean;
	statusCode: number;
	status: number;
	body: string;
	type: string;
}

export interface INestedError {
	errors: Record<string, unknown>;
}

export interface IErrorSource {
	path: string | number;
	message: string;
}

export interface IErrorResponse {
	statusCode: number;
	name: string;
	errorSource: IErrorSource[];
	stack?: string;
}

export interface IRoute {
	path: string;
	route: Router;
}

export interface BanguPayload extends JwtPayload {
	id: string;
	role: TUserRole;
}

/**
 * Type for Express middleware in `req.app._router.stack`
 */
export interface Middleware {
	route?: {
		path: string;
		methods: Record<string, boolean>;
		queryParams?: Record<string, unknown>;
	};
	name: string;
	handle: RequestHandler;
}
