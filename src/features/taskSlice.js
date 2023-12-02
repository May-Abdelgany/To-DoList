
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
    },
    reducers: {
        addTask: (state, action) => {
            action.payload.id = state.list.length + 1
            action.payload.isComplete = false
            state.list.push(action.payload);
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.list.findIndex(task => task.id === id);

            if (taskIndex !== -1) {
                state.list[taskIndex] = { ...state.list[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            state.list = state.list.filter(task => task.id !== action.payload);
        },
        updateCompleteStatus: (state, action) => {
            const { id, isComplete } = action.payload;
            const taskIndex = state.list.findIndex(task => task.id === id);

            if (taskIndex !== -1) {
                state.list[taskIndex].isComplete = isComplete;
            }
        },
    },
});

export const { addTask, updateTask, deleteTask, updateCompleteStatus } = taskSlice.actions;
export default taskSlice.reducer;
