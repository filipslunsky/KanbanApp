const {
    _addCategory,
    _updateCategoryById,
    _deleteCategoryById,
    _getCategoriesByProjectId,
} = require('../models/categoriesModel');

const addCategory = async (req, res) => {
    const { categoryName, projectId } = req.body;
    try {
        const data = await _addCategory(categoryName, projectId);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCategoryById = async (req, res) => {
    const { categoryId, categoryName } = req.body;
    try {
        const data = await _updateCategoryById(categoryId, categoryName);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCategoryById = async (req, res) => {
    const { categoryId } = req.body;
    try {
        const data = await _deleteCategoryById(categoryId);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCategoriesByProjectId = async (req, res) => {
    const { projectId } = req.body;
    try {
        const data = await _getCategoriesByProjectId(projectId);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategoriesByProjectId,
};

