
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice.js';

const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
});

export default store;
