import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { blogServices } from './blog.services';

/** Create a new blog. */
const createBlog = catchAsync(async (req, res) => {
	const result = await blogServices.saveBlogInDB(req.body, req?.user?.email);

	sendResponse(res, 'Blog', 'POST', result);
});

const getAllBlogs = catchAsync(async (_req, res) => {
	const result = await blogServices.getAllBlogsFromDB();

	sendResponse(res, 'Blog', 'GET', result);
});

export const blogControllers = { createBlog, getAllBlogs };
