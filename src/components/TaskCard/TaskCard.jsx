// Functional Component
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Checkbox, FormControlLabel } from '@mui/material';
import './TaskCard.css'

import CustomizedDialogs from '../Dialog/Dialog.jsx';
import { useDispatch } from 'react-redux';
import { updateCompleteStatus } from '../../features/taskSlice.js';
const TaskCard = ({ task }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [buttonName, setButtonName] = useState(null);
    const dispatch = useDispatch();
    const handleChange = () => {
        const newCompleteStatus = !task.isComplete;
        dispatch(updateCompleteStatus({ id: task.id, isComplete: newCompleteStatus }));
    };
    const handleClose = () => {
        setOpen(false);
    };
    const update = () => {
        setTitle('Update Task')
        setButtonName('update')
        setOpen(true);
    };
    const deleteTask = () => {
        setTitle('Delete Task')
        setButtonName('delete')
        setOpen(true);
    };

    return (
        <>
            <CustomizedDialogs task={task} buttonName={buttonName} open={open} onClose={handleClose} title={title}></CustomizedDialogs>
            <Card className='card'>

                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className='fw-bold'>
                            {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {task.task}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className='d-flex justify-content-between w-100 align-items-center'>
                        <div>
                            <Button size="small" color="warning" onClick={update}>
                                update
                            </Button>
                            <Button size="small" color="error" onClick={deleteTask}>
                                delete
                            </Button>
                        </div>
                        <FormControlLabel control={<Checkbox checked={task.isComplete} onClick={handleChange} />} label={
                            task.isComplete ? 'complete' : 'not completed'
                        } />

                    </div>
                </CardActions>
            </Card>
        </>
    );
};

export default TaskCard;