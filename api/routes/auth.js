import { Router } from 'express';
import { checkLoggedIn } from '../../middleware/auth.js';
const route = Router();

export default (app) => {
	app.use('/auth', route);

	route.post('/register', async (req, res) => {});

	route.post('/login', async (req, res) => {});

    route.get('/logout', async (req, res) => {});

    route.get('/silentlogin', async (req, res) => {});
};
