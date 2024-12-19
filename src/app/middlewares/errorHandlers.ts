import chalk from 'chalk';
import processErrors from '../errors/processErrors';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { Middleware } from '../types/interfaces';
import { STATUS_CODES } from '../constants';

/**
 * Middleware to Handle "Method Not Allowed" and "Not Found" Errors.
 */
export const handleInvalidRequest: RequestHandler = (req, _res, next) => {
	const availableMethods: string[] = [];

	// Check if any available route matches the requested path
	req.app._router.stack.forEach((middleware: Middleware) => {
		if (middleware.route?.path === req.path) {
			availableMethods.push(
				...Object.keys(middleware.route.methods).map((method) =>
					method.toUpperCase(),
				),
			);
		}
	});

	// Method Not Allowed
	if (availableMethods.length > 0 && !availableMethods.includes(req.method)) {
		const error = new ErrorWithStatus(
			'MethodNotAllowedError',
			`Method “${req.method}” is not allowed for the route “${req.path}”. Allowed methods: ${availableMethods.join(', ')}.`,
			STATUS_CODES.METHOD_NOT_ALLOWED,
			req.path,
		);
		return next(error);
	}

	// Route Not Found
	const error = new ErrorWithStatus(
		'NotFoundError',
		`Requested End-Point “${req.method}: ${req.url}” Not Found!`,
		STATUS_CODES.NOT_FOUND,
		req.path,
	);
	return next(error);
};

/**
 * Middleware to Handle Global Errors.
 */
export const catchAllErrors: ErrorRequestHandler = (err, _req, res, next) => {
	const { statusCode, name, errorSource, stack } = processErrors(err);

	// * Log error msg in the server console
	console.error(chalk.redBright.bold('🛑 Errors:'));
	errorSource.forEach((err) => {
		console.error(chalk.redBright(`	➡ ${err.message}`));
	});

	// console.error(error);

	// * Delegate to the default Express error handler
	// ? if the headers have already been sent to the client
	if (res.headersSent) {
		return next(err);
	}

	// * Send error response with status code
	res.status(statusCode).json({
		success: false,
		message: errorSource.map((err) => err.message).join('; '),
		statusCode,
		error: {
			details: errorSource.map((source) => ({ name, ...source })),
		},

		stack: stack ? stack : 'Stack Trace Not Available!',
	});
};
