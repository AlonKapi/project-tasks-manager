export const checkLoggedIn = (req, res, next) => {
	if (!req.session.userId) {
		return res.status(401).send('Not logged in.');
	}

	req.userId = req.session.userId;
	req.email = req.session.email;
	next();
};

export const validateAuthRequestDetails = (req, res, next) => {
	const { email, password } = req.body;
	
	if (!email) {
		return res.status(400).send('Missing email.');
	}

	if (!password) {
		return res.status(400).send('Missing password.');
	}

	next();
};