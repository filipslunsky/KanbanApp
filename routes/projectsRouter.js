const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addProject,
    updateProjectById,
    deleteProjectById,
    getProjectsByProjectId,
} = require('../controllers/projectsController.js');

const projectsRouter = Router();

projectsRouter.post('/', authenticateLoginToken, addProject);
projectsRouter.put('/', authenticateLoginToken, updateProjectById);
projectsRouter.post('/delete', authenticateLoginToken, deleteProjectById);
projectsRouter.post('/all', authenticateLoginToken, getProjectsByProjectId);

module.exports = projectsRouter;
