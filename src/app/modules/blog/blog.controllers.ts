import { Types } from 'mongoose';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { blogServices } from './blog.services';

/** Create a new blog. */
const createBlog = catchAsync(async (req, res) => {
	const result = await blogServices.saveBlogInDB(req.body, req?.user?.email);

	sendResponse(res, 'Blog', 'POST', result);
});

/** Update a blog. */
const updateBlog = catchAsync(async (req, res) => {
	const id = new Types.ObjectId(req.params.id);

	const result = await blogServices.updateBlogInDB(id, req.body, req?.user);

	sendResponse(res, 'Blog', 'PATCH', result);
});

/** Delete a blog */
const deleteBlog = catchAsync(async (req, res) => {
	const id = new Types.ObjectId(req.params.id);

	await blogServices.deleteBlogFromDB(id, req?.user);

	sendResponse(res, 'Blog', 'DELETE');
});

/** Get all blogs. */
const getAllBlogs = catchAsync(async (req, res) => {
	const result = await blogServices.getAllBlogsFromDB(req.query);

	sendResponse(res, 'Blog', 'GET', result);
});

export const blogControllers = {
	createBlog,
	updateBlog,
	deleteBlog,
	getAllBlogs,
};
