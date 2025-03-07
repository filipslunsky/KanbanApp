import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROJECTS_URL = `${import.meta.env.VITE_API_URL}/projects`;

const initialState = {
    projects: [],
    projectsStatus: '',
    addProjectStatus: '',
    updateProjectStatus: '',
    deleteProjectStatus: '',
    nightMode: false,
    sideBar: true,
    profileDetail: false,
    newTaskWindow: false,
    editTaskWindow: false,
    currentProjectId: null,
    currentTaskId: null,
    statusMessage: {
        text: '',
        style: '',
        visible: false,
    },
    error: null,
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const getProjects = createAsyncThunk('general/getProjects', async (_, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${PROJECTS_URL}/all`,
            {
                email: user.email,
                userId: user.userId,
            },
            { headers }
        );
        
        return response.data.projects;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addProject = createAsyncThunk('general/addProject', async (addItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${PROJECTS_URL}`,
            {
                email: user.email,
                userId: user.userId,
                projectName: addItem.projectName,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateProject = createAsyncThunk('general/updateProject', async (updateItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.put(
            `${PROJECTS_URL}`,
            {
                email: user.email,
                projectName: updateItem.projectName,
                projectId: updateItem.projectId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteProject = createAsyncThunk('general/deleteProject', async (deleteItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${PROJECTS_URL}/delete`,
            {
                email: user.email,
                projectId: deleteItem.projectId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        toggleNightMode: (state) => {
            state.nightMode = !state.nightMode;
        },
        toggleSideBar: (state) => {
            state.sideBar = !state.sideBar;
        },
        toggleNewTaskWindow: (state) => {
            state.newTaskWindow = !state.newTaskWindow;
        },
        toggleEditTaskWindow: (state) => {
            state.editTaskWindow = !state.editTaskWindow;
        },
        toggleProfileDetailWindow: (state) => {
            state.profileDetail = !state.profileDetail;
        },
        setStatusMessage: (state, action) => {
            state.statusMessage = {
                text: action.payload.text,
                visible: action.payload.visible,
                style: action.payload.style,
            };
        },
        resetAddProjectStatus: (state) => {
            state.addProjectStatus = '';
        },
        resetUpdateProjectStatus: (state) => {
            state.updateProjectStatus = '';
        },
        resetDeleteProjectStatus: (state) => {
            state.deleteProjectStatus = '';
        },
        setCurrentProjectId: (state, action) => {
            state.currentProjectId = action.payload;
        },
        setCurrentTaskId: (state, action) => {
            state.currentTaskId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.projectsStatus = 'loading';
                state.error = null;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.projectsStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projectsStatus = 'success';
                state.projects = action.payload;
                state.error = null;
            })
            .addCase(addProject.pending, (state) => {
                state.addProjectStatus = 'loading';
                state.error = null;
            })
            .addCase(addProject.rejected, (state, action) => {
                state.addProjectStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.addProjectStatus = 'success';
                state.error = null;
                const newProject = action.payload.project;
                state.projects.push(newProject);
            })
            .addCase(updateProject.pending, (state) => {
                state.updateProjectStatus = 'loading';
                state.error = null;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.updateProjectStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.updateProjectStatus = 'success';
                state.error = null;
                const updatedProject = action.payload.project;
                const index = state.projects.findIndex(project => project.project_id === updatedProject.project_id);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                };
            })
            .addCase(deleteProject.pending, (state) => {
                state.deleteProjectStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.deleteProjectStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.deleteProjectStatus = 'success';
                state.error = null;
                const deletedProjectId = action.payload.deletedProjectId;
                const index = state.projects.findIndex(project => project.project_id === deletedProjectId);
                if (index !== -1) {
                    state.projects.splice(index, 1);
                };
            })
    },
    
});

export const {
    toggleNightMode,
    toggleSideBar,
    toggleNewTaskWindow,
    toggleProfileDetailWindow,
    toggleEditTaskWindow,
    resetAddProjectStatus,
    resetUpdateProjectStatus,
    resetDeleteProjectStatus,
    setStatusMessage,
    setCurrentProjectId,
    setCurrentTaskId,
} = generalSlice.actions;
export default generalSlice.reducer;
