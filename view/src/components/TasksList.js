import React from 'react';
import { Typography } from '@mui/material';
import Task from './Task';

export default function TasksList({listName, tasks}) {
    return (
        <div className='tasks-container'>
            <Typography variant="h6" component="h6">{listName}</Typography>
            {tasks.map((task) => <Task name={task.name} priority={task.priority} key={task._id} />)}
        </div>
    )
}