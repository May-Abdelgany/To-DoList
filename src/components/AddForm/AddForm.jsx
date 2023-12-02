import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Joi from 'joi';
import './AddForm.css'
import { useDispatch } from 'react-redux';
import { addTask, deleteTask, updateTask } from '../../features/taskSlice.js';
const AddForm = ({ task, onClose, buttonName }) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    let [formData, setFormData] = useState({
        title: '',
        task: '',
    });
    const [errors, setErrors] = useState({});
    const schema = Joi.object({
        title: Joi.string().required().label('Title'),
        task: Joi.string().required().label('Task'),
    });
    const validateField = (name, value) => {
        const fieldSchema = Joi.object({ [name]: schema.extract(name) });
        const { error } = fieldSchema.validate({ [name]: value });

        return error ? error.details[0].message : null;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        const fieldError = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
            const validationErrors = {};
            error.details.forEach((detail) => {
                validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
        } else {
            setErrors({});

            if (buttonName == 'update') {
                dispatch(updateTask({ id: task.id, updatedTask: formData }));
            } else if (buttonName == 'delete') {
                dispatch(deleteTask(task.id));
            }
            else {
                dispatch(addTask(formData));
            }
            formData = {
                task: '',
                title: ''
            }
            onClose()
        }
    };
    const getButtonColor = (actionType) => {
        switch (actionType.buttonName) {
            case 'add':
                return 'primary';
            case 'update':
                return 'warning';
            case 'delete':
                return 'error';
            default:
                return 'default';
        }
    };
    useEffect(() => {
        if (buttonName != 'add') {
            setFormData({
                title: task.title,
                task: task.task,
            })
        }
        if (buttonName == 'delete') {
            setDisabled(true)
        }
    }, []);
    return (<>
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    '& > :not(style)': {
                        m: 1
                    },
                }
                }
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        className='w-100'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title || ''}
                        InputProps={{ disabled }}
                    />
                </div>
                <div>
                    <TextField
                        className='w-100'
                        id="standard-multiline-static"
                        label="Task"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="task"
                        value={formData.task}
                        onChange={handleChange}
                        error={!!errors.task}
                        helperText={errors.task || ''}
                        InputProps={{ disabled }}
                    />
                </div>
            </Box>
            <DialogActions>
                <Button color={getButtonColor({ buttonName })} type="submit" variant="contained">
                    {buttonName}
                </Button>
            </DialogActions>
        </form>
    </>);
};

export default AddForm;