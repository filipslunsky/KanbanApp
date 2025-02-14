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
        });
        
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding subtask: ${error.message}` };
    }
};

const _updateSubtaskById = async (subtaskId, subtaskName, isCompleted) => {
    try {
        return await db.transaction(async (trx) => {
            const subtask = await trx('subtasks')
            .select('subtask_id')
            .where({subtask_id: subtaskId})
            .first();

            if (!subtask) {
                return { success: false, message: 'Subtask not found' }
            };

            const updatedSubtask = await trx('subtasks')
            .update({
                subtask_name: subtaskName,
                is_completed: isCompleted,
            })
            .where({subtask_id: subtask.subtask_id})
            .returning(['subtask_id', 'subtask_name', 'is_completed', 'task_id']);

            return {
                success: true,
                message: 'Subtask successfully updated',
                subtask: updatedSubtask[0]
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating subtask: ${error.message}`};
    }
};

const _deleteSubtaskById = async (subtaskId) => {
    try {
        return await db.transaction(async (trx) => {
            const subtask = await trx('subtasks')
            .select('subtask_id')
            .where({subtask_id: subtaskId})
            .first();

            if (!subtask) {
                return { success: false, message: 'Subtask not found' }
            };

            await trx('subtasks')
            .delete()
            .where({subtask_id: subtask.subtask_id});

            return { success: true, message: 'Subtask successfully deleted' };
        });
        
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting subtask: ${error.message}`};
    }
};

module.exports = {
    _addSubtask,
    _updateSubtaskById,
    _deleteSubtaskById,
};
