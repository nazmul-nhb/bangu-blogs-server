import { Types } from 'mongoose';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { adminServices } from './admin.services';

/** Delete a blog */
const deleteBlog = catchAsync(async (req, res) => {
	const id = new Types.ObjectId(req.params.id);

	await adminServices.deleteBlogFromDB(id, req?.user);

	sendResponse(res, 'Blog', 'DELETE');
});

export const adminControllers = { deleteBlog };
