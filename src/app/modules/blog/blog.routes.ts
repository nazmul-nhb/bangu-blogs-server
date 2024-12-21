import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';
import { blogControllers } from './blog.controllers';
import authorizeUser from '../../middlewares/authorizeUser';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
	'/',
	authorizeUser(USER_ROLE.USER),
	validateRequest(blogValidations.creationSchema),
	blogControllers.createBlog,
);

router.patch(
	'/:id',
	authorizeUser(USER_ROLE.USER),
	validateRequest(blogValidations.updateSchema),
	blogControllers.updateBlog,
);

router.delete(
	'/:id',
	authorizeUser(USER_ROLE.USER),
	blogControllers.deleteBlog,
);

router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
