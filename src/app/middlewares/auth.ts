import configs from '../configs';
import catchAsync from '../utilities/catchAsync';
import type { TUserRole } from '../modules/user/user.types';
import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../utilities/authUtilities';
import { STATUS_CODES } from '../constants';

const auth = (...requiredRoles: TUserRole[]) => {
	return catchAsync(async (req, _res, next) => {
		const token = req.headers.authorization;

		// Verify token
		const decoded = verifyToken(configs.accessSecret, token);

		// Validate user
		await User.validateUser(decoded.email);

		if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
			throw new ErrorWithStatus(
				'AuthorizationError',
				"You're not authorized",
				STATUS_CODES.UNAUTHORIZED,
				'auth',
			);
		}

		req.user = decoded;

		next();
	});
};

export default auth;
