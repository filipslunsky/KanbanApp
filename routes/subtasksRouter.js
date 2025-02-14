const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addSubtask,
    updateSubtaskById,
    deleteSubtaskById,
} = require('../controllers/subtasksController.js');

const subtasksRouter = Router();

subtasksRouter.post('/', authenticateLoginToken, addSubtask);
subtasksRouter.put('/', authenticateLoginToken, updateSubtaskById);
subtasksRouter.post('/delete', authenticateLoginToken, deleteSubtaskById);

module.exports = subtasksRouter;