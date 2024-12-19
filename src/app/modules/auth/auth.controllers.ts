import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';

/** Register a new user */
const registerUser = catchAsync(async (req, res) => {
	const result = await authServices.registerUserInDB(req.body);

	sendResponse(res, 'User', 'POST', result, 'User registered successfully!');
});

export const authControllers = { registerUser };
