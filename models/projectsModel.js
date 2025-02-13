const { db } = require('../config/db.js');

const _addProject = async (projectName, userId) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ user_id: userId })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            };

            const newProject = await trx('projects').insert({
                user_id: user.user_id,
                project_name: projectName,
            })
            .returning('project_name', 'project_id', 'user_id');

            return { 
                success: true, 
                message: 'Project successfully created',
                project: newProject,
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding project: ${error.message}` };
    }
};

const _updateProjectById = async (projectId) => {};

const _deleteProjectById = async (projectId) => {};

const _getProjectsByUserId = async (userId) => {};

module.exports = {
    _addProject,
    _updateProjectById,
    _deleteProjectById,
    _getProjectsByUserId,
};
