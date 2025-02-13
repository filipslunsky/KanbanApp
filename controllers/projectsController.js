const {
    _addProject,
    _updateProjectById,
    _deleteProjectById,
    _getProjectsByUserId,
} = require('../models/projectsModel.js');

const addProject = async (req, res) => {
    const { projectName, userId } = req.body;
    try {
        const data = await _addProject(projectName, userId);
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

const updateProjectById = async (req, res) => {
    const { projectId, projectName } = req.body;
    try {
        const data = await _updateProjectById(projectId, projectName);
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

const deleteProjectById = async (req, res) => {
    const { projectId } = req.body;
    try {
        const data = await _deleteProjectById(projectId);
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
        const data = await _getProjectsByUserId(userId);
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
    addProject,
    updateProjectById,
    deleteProjectById,
    getCategoriesByProjectId,
};