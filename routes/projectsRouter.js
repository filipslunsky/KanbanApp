const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addProject,
    updateProjectById,
    deleteProjectById,
    getCategoriesByProjectId,
} = require('../controllers/projectsController.js');

const projectsRouter = Router();

projectsRouter.post('/', authenticateLoginToken, addProject);
projectsRouter.put('/', authenticateLoginToken, updateProjectById);
projectsRouter.post('/delete', authenticateLoginToken, deleteProjectById);

module.exports = projectsRouter;
