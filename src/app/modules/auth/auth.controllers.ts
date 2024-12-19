import configs from '../../configs';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';

/** Register a new user */
const registerUser = catchAsync(async (req, res) => {
	const result = await authServices.registerUserInDB(req.body);

	sendResponse(res, 'User', 'POST', result, 'User registered successfully!');
});

/** Login a user */
const loginUser = catchAsync(async (req, res) => {
	const tokens = await authServices.loginUser(req.body);

	const { refreshToken, accessToken } = tokens;

	res.cookie('refreshToken', refreshToken, {
		secure: configs.NODE_ENV === 'production',
		httpOnly: true,
	});

	sendResponse(
		res,
		'User',
		'OK',
		{ token: accessToken },
		'Login successful!',
	);
});

/** Generate new access token. */
const refreshToken = catchAsync(async (req, res) => {
	const { refreshToken } = req.cookies;

	const result = await authServices.refreshToken(refreshToken);

	sendResponse(
		res,
		'N/A',
		'OK',
		result,
		'Successfully retrieved new access token!',
	);
});

export const authControllers = { registerUser, loginUser, refreshToken };
