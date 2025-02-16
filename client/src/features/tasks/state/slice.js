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
        
        return response.data.tasks;
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
            },
            { headers }
        );

        return response.data.task;

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
                categoryId: updateItem.categoryId,
            },
            { headers }
        );

        return response.data.task;

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
            `${CATEGORIES_URL}/tasks/delete`,
            {
                email: user.email,
                taskId: deleteItem.taskId,
            },
            { headers }
        );

        return response.data.task;

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
            `${CATEGORIES_URL}/subtasks/delete`,
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

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        resetAddCategoryStatus: (state) => {
            state.addProjectStatus = '';
        },
        resetUpdateCategoryStatus: (state) => {
            state.updateProjectStatus = '';
        },
        resetDeleteCategoryStatus: (state) => {
            state.deleteProjectStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.categoriesStatus = 'loading';
                state.error = null;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.categoriesStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoriesStatus = 'success';
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(addCategory.pending, (state) => {
                state.addCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.addCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.addCategoryStatus = 'success';
                state.error = null;
            })
            .addCase(updateCategory.pending, (state) => {
                state.updateCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.updateCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.updateCategoryStatus = 'success';
                state.error = null;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.deleteCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleteCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.deleteCategoryStatus = 'success';
                state.error = null;
            })
    },
    
});

export const {
    
} = tasksSlice.actions;
export default tasksSlice.reducer;
