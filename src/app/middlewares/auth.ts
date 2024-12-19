import configs from '../configs';
import catchAsync from '../utilities/catchAsync';
import type { TUserRole } from '../modules/user/user.types';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../utilities/authUtilities';
import { STATUS_CODES } from '../constants';

/**
 * Middleware to check if the user is authorized to access the route.
 * @param requiredRoles User role/roles (comma separated) required to access the route.
 */
const authorizeUser = (...requiredRoles: TUserRole[]) => {
	return catchAsync(async (req, _res, next) => {
		const token = req.headers.authorization?.split(' ')[1];

		// * Verify token
		const decodedToken = verifyToken(configs.accessSecret, token);

		const { email, role } = decodedToken;

		// Validate user
		await User.validateUser(email);

		if (requiredRoles.length && !requiredRoles.includes(role)) {
			throw new ErrorWithStatus(
				'AuthorizationError',
				"You're not authorized",
				STATUS_CODES.UNAUTHORIZED,
				'auth',
			);
		}

		req.user = decodedToken;

		next();
	});
};

export default authorizeUser;
