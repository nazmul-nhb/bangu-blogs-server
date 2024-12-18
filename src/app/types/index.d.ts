import type { BanguPayload } from './interfaces';

declare global {
	namespace Express {
		interface Request {
			user: BanguPayload;
		}
	}
}
