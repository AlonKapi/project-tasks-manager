import React, { useState, useEffect } from 'react';
import { callGetProjectsService } from '../utils/projectServices';
import CreateProject from './CreateProject';
import ProjectDetails from './ProjectDetails';

export default function Projects() {
    const [selectedProjectId, setSelectedProjectId] = useState('');

    useEffect(() => {
        const getProjects = async () => {
            const projects = await callGetProjectsService();

            if (projects) {
                setSelectedProjectId(projects[0]._id);
            }
        };

        getProjects();
    }, []);

    return (
        <> 
            {
                selectedProjectId ? <ProjectDetails selectedProjectId={selectedProjectId} /> : <CreateProject setSelectedProjectId={setSelectedProjectId} />
            }
        </>
    )
}