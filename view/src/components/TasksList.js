import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';
import Task from './Task';

export default function TasksList({listName, listId, tasks}) {
    return (
        <div className='tasks-container'>
            <Typography variant="h6" component="h6">{listName}</Typography>
            <Droppable droppableId={listId}>
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => 
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Task name={task.name} priority={task.priority} key={task._id} />
                                    </li>
                                )}
                            </Draggable>
                        )}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}