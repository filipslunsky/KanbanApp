import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/state/slice.js';
import generalSlice from '../features/general/state/slice.js';
import categoriesSlice from '../features/categories/state/slice.js';
import tasksSlice from '../features/tasks/state/slice.js';

const appReducer = combineReducers({
    user: userSlice,
    general: generalSlice,
    categories: categoriesSlice,
    tasks: tasksSlice,
});

const store = configureStore({
    reducer: appReducer
});

export default store;
