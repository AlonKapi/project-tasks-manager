import React from 'react';
import { Typography, Chip } from '@mui/material';

export default function Task({name, priority}) {
    return (
        <div className='task'>
            <Typography>{name}</Typography>
            <Chip 
                className={priority === 1 ? 'task-high-priority' : priority === 2 ? 'task-medium-priority' : ''}
                label={priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low'}
            />
        </div>
    )
}