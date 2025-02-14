const {
    _addTask,
    _updateTaskById,
    _deleteTaskById,
    _getTasksByProjectId,
} = require('../models/tasksModel.js');

const addTask = async (req, res) => {
    const { taskName, taskDescription, projectId, categoryId } = req.body;
    try {
        const data = await _addTask(taskName, taskDescription, projectId, categoryId);
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

const updateTaskById = async (req, res) => {
    const { taskId, taskName, categoryId } = req.body;
    try {
        const data = await _updateTaskById(taskId, taskName, categoryId);
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

const deleteTaskById = async (req, res) => {
    const { taskId } = req.body;
    try {
        const data = await _deleteTaskById(taskId);
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

const getTasksByProjectId = async (req, res) => {
    const { projectId } = req.body;
    try {
        const data = await _getTasksByProjectId(projectId);
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
    addTask,
    updateTaskById,
    deleteTaskById,
    getTasksByProjectId,
};

