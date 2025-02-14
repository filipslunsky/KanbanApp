const {
    _addSubtask,
    _updateSubtaskById,
    _deleteSubtaskById,
} = require('../models/subtasksModel.js');

const addSubtask = async (req, res) => {
    const { subtaskName, taskId } = req.body;
    try {
        const data = await _addSubtask(subtaskName, taskId);
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

const updateSubtaskById = async (req, res) => {
    const { subtaskId, subtaskName, isCompleted } = req.body;
    try {
        const data = await _updateSubtaskById(subtaskId, subtaskName, isCompleted);
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

const deleteSubtaskById = async (req, res) => {
    const { subtaskId } = req.body;
    try {
        const data = await _deleteSubtaskById(subtaskId);
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
    addSubtask,
    updateSubtaskById,
    deleteSubtaskById,
};