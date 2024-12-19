import { Router } from 'express';
import type { IRoute } from '../types/interfaces';
import { authRoutes } from '../modules/auth/auth.routes';

const router = Router();

const routes: IRoute[] = [
	{
		path: '/auth',
		route: authRoutes,
	},
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
