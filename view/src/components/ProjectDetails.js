import React, { useEffect, useState } from 'react';
import { callGetProjectService, callCreateTaskService } from '../utils/projectServices';
import TasksList from './TasksList';
import CreateTask from './CreateTask';
import { Button } from '@mui/material';

export default function ProjectDetails({selectedProjectId}) {
    const [projectDetails, setProjectDetails] = useState();
    const [showCreateTask, setShowCreateTask] = useState(false);

    useEffect(() => {
        const getProjectDetails = async () => {
            const project = await callGetProjectService(selectedProjectId);

            if (project) {
                setProjectDetails(project);
            } else {
                // TODO handle errors
            }
        };

        getProjectDetails();
    }, [selectedProjectId]);

    const createTask = async (name, priority) => {
        setShowCreateTask(false);

        const updatedTodoList = await callCreateTaskService(selectedProjectId, name, priority);
        setProjectDetails((prevState) => ({
            ...prevState,
            toDo: updatedTodoList
        }))
    };

    return (
        <>
            <div className='project-actions'>
                <Button className='project-action-btn' variant='contained' onClick={() => setShowCreateTask(true)}>Create Task</Button>
            </div>
            {
                projectDetails && (
                    <div className='project-container'>
                        <TasksList listName={'To do'} tasks={projectDetails.toDo}/>
                        <TasksList listName={'Doing'} tasks={projectDetails.doing}/>
                        <TasksList listName={'Done'} tasks={projectDetails.done}/>
                    </div>
                )
            }
            <CreateTask showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} createTask={createTask} />
        </>
    )
}