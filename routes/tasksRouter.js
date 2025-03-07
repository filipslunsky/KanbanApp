const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addTask,
    updateTaskById,
    deleteTaskById,
    getTasksByProjectId,
    updateTaskCategoryByTaskId,
} = require('../controllers/tasksController.js');

const tasksRouter = Router();

tasksRouter.post('/', authenticateLoginToken, addTask);
tasksRouter.put('/', authenticateLoginToken, updateTaskById);
tasksRouter.post('/delete', authenticateLoginToken, deleteTaskById);
tasksRouter.post('/all', authenticateLoginToken, getTasksByProjectId);
tasksRouter.post('/category', authenticateLoginToken, updateTaskCategoryByTaskId);

module.exports = tasksRouter;