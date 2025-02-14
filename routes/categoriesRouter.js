const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategoriesByProjectId,
} = require('../controllers/categoriesController.js');

const categoriesRouter = Router();

categoriesRouter.post('/', authenticateLoginToken, addCategory);
categoriesRouter.put('/', authenticateLoginToken, updateCategoryById);

module.exports = categoriesRouter;