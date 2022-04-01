import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

export const callGetProjectsService = async () => {
    try {
        const projects = await axios.get(`${SERVER_URL}/project`, { withCredentials: true });
        return projects.data;
    } catch(error) {
        console.log(error);
        return [];
    }
};

export const callCreateProjectService = async (name) => {
    try {
        const project = await axios.post(`${SERVER_URL}/project`, {name}, { withCredentials: true });
        return project.data;
    } catch(error) {
        console.log(error);
    }
};

export const callGetProjectService = async (projectId) => {
    try {
        const project = await axios.get(`${SERVER_URL}/project/${projectId}`, { withCredentials: true });
        return project.data;
    } catch(error) {
        console.log(error);
    }
};

export const callUpdateProjectService = async (projectId, updates) => {
    try {
        const project = await axios.put(`${SERVER_URL}/project/${projectId}`, { ...updates }, { withCredentials: true });
        return project.data;
    } catch(error) {
        console.log(error);
    }
};

export const callDeleteProjectService = async (projectId) => {
    try {
        const project = await axios.delete(`${SERVER_URL}/project/${projectId}`, { withCredentials: true });
        return project.data;
    } catch(error) {
        console.log(error);
    }
};

export const callCreateTaskService = async (projectId, name, priority) => {
    try {
        const project = await axios.post(`${SERVER_URL}/project/${projectId}/task`, { name, priority }, { withCredentials: true });
        return project.data;
    } catch(error) {
        console.log(error);
    }
};