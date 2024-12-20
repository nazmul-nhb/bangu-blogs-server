import { Router } from 'express';
import { adminControllers } from './admin.controllers';
import authorizeUser from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.delete(
	'/blogs/:id',
	authorizeUser(USER_ROLE.ADMIN),
	adminControllers.deleteBlog,
);

export const adminRoutes = router;
