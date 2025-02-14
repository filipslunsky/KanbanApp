const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addTask,
    updateTaskById,
    deleteTaskById,
    getTasksByProjectId,
} = require('../controllers/tasksController.js');

const tasksRouter = Router();

module.exports = tasksRouter;