const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addSubtask,
    updateSubtaskById,
    deleteSubtaskById,
} = require('../controllers/subtasksController.js');

const subtasksRouter = Router();

module.exports = subtasksRouter;