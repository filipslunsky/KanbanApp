import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
    tasks: [],
    tasksStatus: '',
    addTaskStatus: '',
    updateTaskStatus: '',
    deleteTaskStatus: '',
    addSubtaskStatus: '',
    updateSubtaskStatus: '',
    deleteSubtaskStatus: '',
    taskCategoryStatus: '',
    error: null,
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const getTasks = createAsyncThunk('tasks/getTasks', async (projectItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/tasks/all`,
            {
                email: user.email,
                projectId: projectItem.projectId,
            },
            { headers }
        );
        
        return response.data.tasksAndSubtasks;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addTask = createAsyncThunk('tasks/addTask', async (addItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/tasks`,
            {
                email: user.email,
                projectId: addItem.projectId,
                categoryId: addItem.categoryId,
                taskName: addItem.taskName,
                subtasks: addItem.subtasks,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (updateItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.put(
            `${BASE_URL}/tasks`,
            {
                email: user.email,
                taskName: updateItem.taskName,
                taskId: updateItem.taskId,
                taskDescription: updateItem.taskDescription,
                categoryId: updateItem.categoryId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (deleteItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/tasks/delete`,
            {
                email: user.email,
                taskId: deleteItem.taskId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addSubtask = createAsyncThunk('tasks/addSubtask', async (addItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/subtasks`,
            {
                email: user.email,
                taskId: addItem.taskId,
                subtaskName: addItem.subtaskName,
            },
            { headers }
        );

        return response.data.subtask;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateSubtask = createAsyncThunk('tasks/updateSubtask', async (updateItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.put(
            `${BASE_URL}/subtasks`,
            {
                email: user.email,
                subtaskName: updateItem.subtaskName,
                subtaskId: updateItem.subtaskId,
                isCompleted: updateItem.isCompleted,
            },
            { headers }
        );

        return response.data.subtask;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteSubtask = createAsyncThunk('tasks/deleteSubtask', async (deleteItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/subtasks/delete`,
            {
                email: user.email,
                subtaskId: deleteItem.subtaskId,
            },
            { headers }
        );

        return response.data.subtask;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateTaskCategory = createAsyncThunk('tasks/updateTaskCategory', async (updateItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${BASE_URL}/tasks/category`,
            {
                email: user.email,
                taskId: updateItem.taskId,
                categoryId: updateItem.categoryId,
            },
            { headers }
        );

        return response.data.task;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        resetAddTaskStatus: (state) => {
            state.addTaskStatus = '';
        },
        resetUpdateTaskStatus: (state) => {
            state.updateTaskStatus = '';
        },
        resetDeleteTaskStatus: (state) => {
            state.deleteTaskStatus = '';
        },
        resetAddSubtaskStatus: (state) => {
            state.addSubtaskStatus = '';
        },
        resetUpdateSubtaskStatus: (state) => {
            state.updateSubtaskStatus = '';
        },
        resetDeleteSubtaskStatus: (state) => {
            state.deleteSubtaskStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.tasksStatus = 'loading';
                state.error = null;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.tasksStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasksStatus = 'success';
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(addTask.pending, (state) => {
                state.addTaskStatus = 'loading';
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.addTaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.addTaskStatus = 'success';
                state.error = null;
                state.tasks.push(action.payload.newTask);
            })
            .addCase(updateTask.pending, (state) => {
                state.updateTaskStatus = 'loading';
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.updateTaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.updateTaskStatus = 'success';
                state.error = null;
                const updatedTask = action.payload.task;
                const index = state.tasks.findIndex(task => task.task_id === updatedTask.task_id);
                if (index !== -1) {
                    const previousSubtasks = state.tasks[index].subtasks;
                    const updatedTaskWithSubtasks = {...updatedTask, subtasks: previousSubtasks};
                    state.tasks[index] = updatedTaskWithSubtasks;
                }
            })
            .addCase(deleteTask.pending, (state) => {
                state.deleteTaskStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.deleteTaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.deleteTaskStatus = 'success';
                state.error = null;
                const deletedTaskId = action.payload.deletedTaskId;
                const index = state.tasks.findIndex(task => task.task_id === deletedTaskId);
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
            })
            .addCase(addSubtask.pending, (state) => {
                state.addSubtaskStatus = 'loading';
                state.error = null;
            })
            .addCase(addSubtask.rejected, (state, action) => {
                state.addSubtaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(addSubtask.fulfilled, (state) => {
                state.addSubtaskStatus = 'success';
                state.error = null;
            })
            .addCase(updateSubtask.pending, (state) => {
                state.updateSubtaskStatus = 'loading';
                state.error = null;
            })
            .addCase(updateSubtask.rejected, (state, action) => {
                state.updateSubtaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateSubtask.fulfilled, (state) => {
                state.updateSubtaskStatus = 'success';
                state.error = null;
            })
            .addCase(deleteSubtask.pending, (state) => {
                state.deleteSubtaskStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteSubtask.rejected, (state, action) => {
                state.deleteSubtaskStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteSubtask.fulfilled, (state) => {
                state.deleteSubtaskStatus = 'success';
                state.error = null;
            })
            .addCase(updateTaskCategory.pending, (state) => {
                state.taskCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(updateTaskCategory.rejected, (state, action) => {
                state.taskCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateTaskCategory.fulfilled, (state) => {
                state.taskCategoryStatus = 'success';
                state.error = null;
            })
    },
    
});

export const {
    resetAddTaskStatus,
    resetUpdateTaskStatus,
    resetDeleteTaskStatus,
    resetAddSubtaskStatus,
    resetUpdateSubtaskStatus,
    resetDeleteSubtaskStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;
