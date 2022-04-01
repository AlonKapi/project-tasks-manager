import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from '@mui/material';
import { callGetProjectService, callCreateTaskService, callUpdateProjectService } from '../utils/projectServices';
import TasksList from './TasksList';
import CreateTask from './CreateTask';

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
        }));
    };

    const updateProject = async (updates) => {
        await callUpdateProjectService(selectedProjectId, updates);
    };

    const handleOnDragEnd = async (result) => {
        console.log(result);

        if (!result || !result.destination) return;

        if (result.source.droppableId === result.destination.droppableId) {
            const sourceList = Array.from(projectDetails[result.source.droppableId]);
            const [reorderedItem] = sourceList.splice(result.source.index, 1);
            sourceList.splice(result.destination.index, 0, reorderedItem);

            setProjectDetails((prevState) => ({
                ...prevState,
                [result.source.droppableId]: sourceList
            }));

            updateProject({[result.source.droppableId]: sourceList});
        } else {
            const sourceList = Array.from(projectDetails[result.source.droppableId]);
            const [reorderedItem] = sourceList.splice(result.source.index, 1);

            const destinationList = Array.from(projectDetails[result.destination.droppableId]);
            destinationList.splice(result.destination.index, 0, reorderedItem);

            setProjectDetails((prevState) => ({
                ...prevState,
                [result.source.droppableId]: sourceList,
                [result.destination.droppableId]: destinationList
            }));

            updateProject({[result.source.droppableId]: sourceList, [result.destination.droppableId]: destinationList});
        }
    };

    return (
        <>
            <div className='project-actions'>
                <Button className='project-action-btn' variant='contained' onClick={() => setShowCreateTask(true)}>Create Task</Button>
            </div>
            {
                projectDetails && (
                    <div className='project-container'>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <TasksList listName={'To do'} listId={'toDo'} tasks={projectDetails.toDo}/>
                            <TasksList listName={'Doing'} listId={'doing'} tasks={projectDetails.doing}/>
                            <TasksList listName={'Done'} listId={'done'} tasks={projectDetails.done}/>
                        </DragDropContext>
                    </div>
                )
            }
            <CreateTask showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} createTask={createTask} />
        </>
    )
}