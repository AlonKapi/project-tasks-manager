import { Router } from 'express';
import auth from './routes/auth.js';
import project from './routes/project.js';

export default () => {
	const app = Router();
    auth(app);
	project(app);

	return app;
};