import { Router } from 'express';
import type { IRoute } from '../types/interfaces';

const router = Router();

const routes: IRoute[] = [];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
