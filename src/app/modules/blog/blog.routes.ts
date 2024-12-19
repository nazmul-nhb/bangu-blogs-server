import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';
import { blogControllers } from './blog.controllers';
import authorizeUser from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
	'/',
	authorizeUser(USER_ROLE.USER),
	validateRequest(blogValidations.creationSchema),
	blogControllers.createBlog,
);

export const blogRoutes = router;
