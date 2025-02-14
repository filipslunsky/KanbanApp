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
                project: newProject[0],
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding project: ${error.message}` };
    }
};

const _updateProjectById = async (projectId, projectName) => {
    try {
        return await db.transaction(async (trx) => {
            const project = await trx('projects')
                .select('project_id')
                .where({ project_id: projectId })
                .first();

            if (!project) {
                return { success: false, message: 'Project not found' };
            };

            const updatedProject = await trx('projects')
            .update({
                project_name: projectName
            })
            .where({project_id: projectId})
            .returning(['project_id', 'project_name', 'user_id']);

            return { 
                success: true, 
                message: 'Project successfully updated',
                project: updatedProject[0],
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating project: ${error.message}` };
    }
};

const _deleteProjectById = async (projectId) => {
    try {
        return await db.transaction(async (trx) => {
            const project = await trx('projects')
                .select('project_id')
                .where({ project_id: projectId })
                .first();

            if (!project) {
                return { success: false, message: 'Project not found' };
            };

            await trx('projects')
            .delete()
            .where({project_id: projectId});

            return { 
                success: true, 
                message: 'Project successfully deleted',
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting project: ${error.message}` };
    }
};

const _getProjectsByUserId = async (userId) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ user_id: userId })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            };

            const projects = await trx('projects')
            .select('project_id', 'project_name', 'user_id')
            .where({user_id: user.user_id});

            return { 
                success: true, 
                projects,
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error fetching projects: ${error.message}` };
    }
};

module.exports = {
    _addProject,
    _updateProjectById,
    _deleteProjectById,
    _getProjectsByUserId,
};
