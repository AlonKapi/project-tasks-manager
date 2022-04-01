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

export const validateTaskForCreation = (req, res, next) => {
    const {name, priority} = req.body;

    if (!name || !priority) {
        return res.status(400).send('request missing task fields');
    }

    if (priority < 1 || priority > 3) {
        return res.status(400).send(`bad priority value ${priority}`);
    }

    next();
};