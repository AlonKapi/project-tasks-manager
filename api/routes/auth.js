import { Router } from 'express';
import { checkLoggedIn, validateAuthRequestDetails } from '../../middleware/auth.js';
import { getUserByEmail, registerUser, loginUser } from '../../services/auth.js';
const route = Router();

export default (app) => {
	app.use('/auth', route);

	route.post('/register', validateAuthRequestDetails, async (req, res) => {
		const { email, password } = req.body;

		try {
            if (await getUserByEmail(email)) {
				return res.status(401).send('User already exists with that email.');
			}

            const user = await registerUser(email, password);
            console.log(`Registered user ${user.email}`);

            req.session.userId = user.id;
            req.session.email = user.email;
            
            return res.status(201).json({ email: user.email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
	});

	route.post('/login', validateAuthRequestDetails, async (req, res) => {
		const { email, password } = req.body;

		try {
            const user = await loginUser(email, password);

            if (!user) {
                return res.status(401).send('Bad login credentials.');
            }

            console.log(`Logged in user ${user.email}`);

            req.session.userId = user.id;
            req.session.email = user.email;

            return res.status(200).json({ email: email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
	});

    route.get('/logout', checkLoggedIn, async (req, res) => {
        req.session.destroy(() => {
            console.log(`Logging out user ${req.email}`);
        });
        return res.sendStatus(200);
	});

    route.get('/silentlogin', checkLoggedIn, async (req, res) => {
		return res.status(200).json({ email: req.email });
	});
};
