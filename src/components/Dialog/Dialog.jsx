import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import AddForm from '../AddForm/AddForm.jsx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const CustomizedDialogs = ({ task, open, onClose, title, buttonName }) => {
    useEffect(() => {
    }, []);
    return (
        <>
            <BootstrapDialog
                onClose={() => onClose()}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle className='text-bold text-primary' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => onClose()}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <AddForm task={task}  onClose={onClose} buttonName={buttonName}></AddForm>
            </BootstrapDialog >
        </>
    );
}

export default CustomizedDialogs;