export const checkLoggedIn = (req, res, next) => {
	if (!req.session.email) {
		return res.status(401).send('Not logged in.');
	}

	req.loggedInUser = req.session.email;
	next();
};

export const validateAuthRequestDetails = (req, res, next) => {

	if (!email) {
		return res.status(400).send('Missing email.');
	}

	if (!password) {
		return res.status(400).send('Missing password.');
	}

	next();
};