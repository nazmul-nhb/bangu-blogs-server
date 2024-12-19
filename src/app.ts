import cors from 'cors';
import express from 'express';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import sendResponse from './app/utilities/sendResponse';
import type { Application, Request, Response } from 'express';
import {
	catchAllErrors,
	handleInvalidRequest,
} from './app/middlewares/errorHandlers';

// Create an Express App
const app: Application = express();

// * Respect CORS Policy
app.use(cors());
// * Use Cookie Parser
app.use(cookieParser());
// * Use JSON Parser
app.use(express.json());

// * Root/Test Route
app.get('/', (_req: Request, res: Response) => {
	sendResponse(res, 'N/A', 'GET', null, 'Server is Running! 🏃');
});

// * Application Routes
app.use('/api', router);

// * Error handler for 404 or invalid request
app.use(handleInvalidRequest);

// * Global Error Handler to send error responses
app.use(catchAllErrors);

export default app;
