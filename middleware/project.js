export const validateProjectId = (req, res, next) => {

    if (!req.params.projectId) {
		return res.status(400).send('request missing projectId query field');
	}

    req.projectId = req.params.projectId;
    next();
};

export const validateProjectForUpdate = (req, res, next) => {
    const {name, toDo, doing , done} = req.body;

    if (!name && !toDo && !doing && !done) {
        return res.status(400).send('request missing update fields');
    }

    req.updates = {name, toDo, doing , done};
    next();
};