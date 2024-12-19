import { Router } from 'express';
import type { IRoute } from '../types/interfaces';
import { authRoutes } from '../modules/auth/auth.routes';
import { blogRoutes } from '../modules/blog/blog.routes';

const router = Router();

const routes: IRoute[] = [
	{
		path: '/auth',
		route: authRoutes,
	},
	{
		path: '/blogs',
		route: blogRoutes,
	},
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
