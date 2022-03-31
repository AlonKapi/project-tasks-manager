import { Router } from 'express';
import { checkLoggedIn } from '../../middleware/auth.js';
import { validateProjectId, validateProjectForUpdate } from '../../middleware/project.js';
import { createProject, isProjectExistsByName, isProjectExistsById, getUserProjects, getProjectById, deleteProjectById, updateProject } from '../../services/project.js';
const route = Router();

export default (app) => {
	app.use('/project', route);

    route.post('/', checkLoggedIn, async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send('Missing project name.');
        }

        try {
            if (await isProjectExistsByName(req.userId, name)) {
                return res.status(400).send('Project already exists with that name.');
            }

            const project = await createProject(req.userId, name);
            return res.status(201).json(project);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.get('/', checkLoggedIn, async (req, res) => {
        try {
            const projects = await getUserProjects(req.userId);
            return res.status(200).json(projects);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.get('/:projectId', checkLoggedIn, validateProjectId, async (req, res) => {
        try {
            const project = await getProjectById(req.projectId);

            if (!project) {
                return res.status(404).send('Not found project by this id.');
            }

            return res.status(200).json(project);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.put('/:projectId', checkLoggedIn, validateProjectId, validateProjectForUpdate, async (req, res) => {
        try {
            if (!await isProjectExistsById(req.projectId)) {
                return res.status(404).send('Not found project by this id.');
            }

            const updatedProject = await updateProject(req.projectId, req.updates);
            return res.status(200).json(updatedProject);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

    route.delete('/:projectId', checkLoggedIn, validateProjectId, async (req, res) => {
        try {
            if (!await deleteProjectById(req.projectId)) {
                return res.status(404).send('Not found project by this id.');
            }

            return res.status(200).json({ id: req.projectId });
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });
};