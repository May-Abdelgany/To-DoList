// Functional Component
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Typography variant="h4" color="inherit" component="div" >
                            <div className='py-2'>LOGO</div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;

