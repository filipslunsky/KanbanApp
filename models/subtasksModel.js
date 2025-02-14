const { db } = require('../config/db.js');

const _addSubtask = async (subtaskName, taskId) => {
    try {
        return await db.transaction(async (trx) => {
            const task = await trx('tasks')
            .select('task_id')
            .where({task_id: taskId})
            .first();

            if (!task) {
                return {success: false, message: 'Task not found'}
            }

            const newSubtask = await trx('subtasks')
            .insert({
                subtask_name: subtaskName,
                task_id: task.task_id,
            })
            .returning(['subtask_id', 'subtask_name', 'is_completed', 'task_id']);

            return {
                success: true,
                message: 'Task successfully created',
                subtask: newSubtask[0],
            }
        })
        
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding task: ${error.message}` };
    }
};

const _updateSubtaskById = async () => {};

const _deleteSubtaskById = async () => {};

module.exports = {
    _addSubtask,
    _updateSubtaskById,
    _deleteSubtaskById,
};
