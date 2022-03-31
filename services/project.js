import ProjectModel from '../models/project.js';

export const getUserProjects = async (userId) => {
    return await ProjectModel.find({ userId }).select('name');
};

export const isProjectExistsByName = async (userId, name) => {
    return await ProjectModel.exists({ userId, name });
};

export const isProjectExistsById = async (projectId) => {
    return await ProjectModel.exists({ _id: projectId });
};

export const getProjectById = async (projectId) => {
    return await ProjectModel.findById(projectId);
};

export const createProject = async (userId, name) => {
    const project = new ProjectModel({ userId, name });
    await project.save();

    return project;
}

export const updateProject = async (projectId, updates) => {

    const project = await getProjectById(projectId);

    for (const prop in updates) {
        if (updates[prop]) {
            project[prop] = updates[prop]
        }
    }

    await project.save();
    
    console.log(project);
    return project;
};

export const deleteProjectById = async (projectId) => {
    return await ProjectModel.findByIdAndDelete(projectId);
}