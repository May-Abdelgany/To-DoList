// Functional Component
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import TaskCard from '../TaskCard/TaskCard.jsx';
import EmptyData from '../EmptyData/EmptyData.jsx'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomizedDialogs from '../Dialog/Dialog.jsx';
import { useSelector } from 'react-redux';

const Layout = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [buttonName, setButtonName] = useState(null);
    // const [tasks, setTask] = useState([]);
    let tasks = useSelector((state) => state.tasks.list);

    const handleClose = () => {
        setOpen(false);
    };

    const add = () => {
        setTitle('Add new Task')
        setButtonName('add')
        setOpen(true);
    };
    useEffect(() => {
        setOpen(false)

    }, []);
    return (
        <>

            <CustomizedDialogs buttonName={buttonName} open={open} onClose={handleClose} title={title}></CustomizedDialogs>
            <Navbar></Navbar>
            <div className='my-5'>
                <h1 className='pt-4  text-center'>All Tasks</h1>
                <div className='container'>
                    <div className=' d-flex justify-content-end'>
                        <Button variant="contained" size='large' className='px-3' onClick={add}><AddIcon></AddIcon>Add</Button>
                    </div>
                    {
                        tasks.length ? <div className='row'>
                            {tasks.map((item, index) => (
                                <div className='col-lg-4 col-md-6' key={index}>
                                    <TaskCard task={item}></TaskCard>
                                </div>
                            ))}
                        </div> : <EmptyData></EmptyData>
                    }
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Layout;