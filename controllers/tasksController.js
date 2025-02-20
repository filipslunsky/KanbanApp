const {
    _addTask,
    _updateTaskById,
    _deleteTaskById,
    _getTasksByProjectId,
    _updateTaskCategoryByTaskId,
} = require('../models/tasksModel.js');

const addTask = async (req, res) => {
    const { taskName, taskDescription, projectId, categoryId, subtasks } = req.body;
    try {
        const data = await _addTask(taskName, taskDescription, projectId, categoryId, subtasks);
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
    const { taskId, taskName, taskDescription, categoryId } = req.body;
    try {
        const data = await _updateTaskById(taskId, taskName, taskDescription, categoryId);
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

const updateTaskCategoryByTaskId = async (req, res) => {
    const { taskId, categoryId } = req.body;
    try {
        const data = await _updateTaskCategoryByTaskId(taskId, categoryId);
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
    updateTaskCategoryByTaskId,
};

