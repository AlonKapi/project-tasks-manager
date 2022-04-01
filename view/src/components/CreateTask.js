import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateTask({showCreateTask, setShowCreateTask, createTask}) {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState(1);

    const handleClose = () => {
        setShowCreateTask(false);
    };

    const handleCreateTask = async () => {
        if (!taskName || !taskPriority) return;
        createTask(taskName, taskPriority);
    };

    return (
        <Dialog open={showCreateTask} onClose={handleClose}>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    className="task-name-field"
                    margin="dense"
                    id="name"
                    label="Task Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="task-priority-label">Priority</InputLabel>
                    <Select
                        labelId="task-priority-label"
                        id="task-priority-select"
                        value={taskPriority}
                        label="Priority"
                        onChange={(e) => setTaskPriority(e.target.value)}
                    >
                        <MenuItem value={1}>High</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>Low</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={handleCreateTask}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}