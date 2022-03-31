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

            console.log(`Registered user ${email}`);
            const createdUser = await registerUser(email, password);
            req.session.email = createdUser.email;
            return res.status(201).json({ email: createdUser.email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
	});

	route.post('/login', validateAuthRequestDetails, async (req, res) => {
		const { email, password } = req.body;

		try {
            if (!await loginUser(email, password)) {
                return res.status(401).send('Bad login credentials.');
            }

            console.log(`Logged in user ${email}`);
            req.session.email = email;
            return res.status(200).json({ email: email });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
	});

    route.get('/logout', checkLoggedIn, async (req, res) => {
        req.session.destroy(() => {
            console.log(`Logging out user ${req.session.email}`);
        });
        return res.sendStatus(200);
	});

    route.get('/silentlogin', checkLoggedIn, async (req, res) => {
		return res.status(200).json({ email: req.loggedInUser });
	});
};
