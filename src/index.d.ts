import type { BanguPayload } from './app/types/interfaces';

declare global {
	namespace Express {
		interface Request {
			user?: BanguPayload;
		}
	}
}
