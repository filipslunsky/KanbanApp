const { db } = require('../config/db.js');

const _addTask = async (taskName, taskDescription, projectId, categoryId) => {
    try {
        return await db.transaction(async (trx) => {
            const project = await trx('projects')
                .select('project_id')
                .where({ project_id: projectId })
                .first();

            if (!project) {
                return { success: false, message: 'Project not found' };
            };

            const category = await trx('categories')
                .select('category_id')
                .where({ category_id: categoryId })
                .first();

            if (!category) {
                return { success: false, message: 'Category not found' };
            };

            const newTask = await trx('tasks').insert({
                project_id: project.project_id,
                category_id: category.category_id,
                task_name: taskName,
                task_description: taskDescription,
            })
            .returning(['task_id','task_name', 'task_description', 'project_id', 'category_id']);

            return { 
                success: true, 
                message: 'Task successfully created',
                newTask: newTask[0],
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding task: ${error.message}` };
    }
};

const _updateTaskById = async (taskId, taskName, taskDescription, categoryId) => {
    try {
        return await db.transaction(async (trx) => {
            const task = await trx('tasks')
                .select('task_id')
                .where({ task_id: taskId })
                .first();

            if (!task) {
                return { success: false, message: 'Task not found' };
            };

            const updatedTask = await trx('tasks')
            .update({
                task_name: taskName,
                task_description: taskDescription,
                category_id: categoryId,
            })
            .where({task_id: task.task_id})
            .returning(['task_id', 'task_name', 'task_description', 'category_id', 'project_id']);

            return { 
                success: true, 
                message: 'Task successfully updated',
                task: updatedTask[0],
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating task: ${error.message}` };
    }
};

const _deleteTaskById = async () => {};

const _getTasksByProjectId = async () => {};

module.exports = {
    _addTask,
    _updateTaskById,
    _deleteTaskById,
    _getTasksByProjectId,
};
