import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { blogServices } from './blog.services';

const createBlog = catchAsync(async (req, res) => {
	const result = await blogServices.saveBlogInDB(req.body, req?.user?.email);

	sendResponse(res, 'Blog', 'POST', result);
});

export const blogControllers = { createBlog };
