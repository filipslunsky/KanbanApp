import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CATEGORIES_URL = `${import.meta.env.VITE_API_URL}/categories`;

const initialState = {
    categories: [],
    categoriesStatus: '',
    addCategoryStatus: '',
    updateCategoryStatus: '',
    deleteCategoryStatus: '',
    error: null,
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const getCategories = createAsyncThunk('categories/getcategories', async (projectItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CATEGORIES_URL}/all`,
            {
                email: user.email,
                projectId: projectItem.projectId,
            },
            { headers }
        );
        
        return response.data.categories;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const addCategory = createAsyncThunk('categories/addCategory', async (addItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CATEGORIES_URL}`,
            {
                email: user.email,
                projectId: addItem.projectId,
                categoryName: addItem.categoryName,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (updateItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.put(
            `${CATEGORIES_URL}`,
            {
                email: user.email,
                categoryName: updateItem.categoryName,
                categoryId: updateItem.categoryId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (deleteItem, { rejectWithValue }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = getHeaders();

        if (!user || !user.email) {
            throw new Error('User not found in local storage.');
        }

        const response = await axios.post(
            `${CATEGORIES_URL}/delete`,
            {
                email: user.email,
                categoryId: deleteItem.categoryId,
            },
            { headers }
        );

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        resetAddCategoryStatus: (state) => {
            state.addCategoryStatus = '';
        },
        resetUpdateCategoryStatus: (state) => {
            state.updateCategoryStatus = '';
        },
        resetDeleteCategoryStatus: (state) => {
            state.deleteCategoryStatus = '';
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
            .addCase(addCategory.fulfilled, (state, action) => {
                state.addCategoryStatus = 'success';
                state.error = null;
                state.categories.push(action.payload.category);
            })
            .addCase(updateCategory.pending, (state) => {
                state.updateCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.updateCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.updateCategoryStatus = 'success';
                state.error = null;
                const updatedCategory = action.payload.category;
                const index = state.categories.findIndex(category => category.category_id === updatedCategory.category_id);
                if (index !== -1) {
                    state.categories[index] = updatedCategory;
                };
            })
            .addCase(deleteCategory.pending, (state) => {
                state.deleteCategoryStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.deleteCategoryStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.deleteCategoryStatus = 'success';
                state.error = null;
                const deletedCategoryId = action.payload.deletedCategoryId;
                const index = state.categories.findIndex(category => category.category_id === deletedCategoryId);
                if (index !== -1) {
                    state.categories.splice(index, 1);
                };
            })
    },
    
});

export const {
    resetAddCategoryStatus,
    resetUpdateCategoryStatus,
    resetDeleteCategoryStatus,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
