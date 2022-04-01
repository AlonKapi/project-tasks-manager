import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { callCreateProjectService } from '../utils/projectServices';

export default function CreateProject({setSelectedProjectId}) {
    const [projectName, setProjectName] = useState('');

    const handleCreateNewProject = async () => {
        if (!projectName) return;
        const createdProject = await callCreateProjectService(projectName);

        if (createdProject) {
            setSelectedProjectId(createdProject._id);
        } else {
            // TODO handle error
        }
    }

    return (
        <div className='form-content'>
          <TextField className='input-field' required id='name' type='text' label='Project Name' onChange={(e) => setProjectName(e.target.value)} />
          <div className='form-buttons'>
            <Button variant='contained' onClick={() => handleCreateNewProject()}>Create</Button>
          </div>
        </div>
    );
}