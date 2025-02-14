const { db } = require('../config/db.js');

const _addCategory = async (categoryName, projectId) => {try {
    return await db.transaction(async (trx) => {
        const project = await trx('projects')
            .select('project_id')
            .where({ project_id: projectId })
            .first();

        if (!project) {
            return { success: false, message: 'Project not found' };
        };

        const newCategory = await trx('categories').insert({
            project_id: project.project_id,
            category_name: categoryName,
        })
        .returning(['category_name', 'category_id', 'project_id']);

        return { 
                success: true, 
                message: 'Category successfully created',
                categoryName: newCategory[0].category_name,
                categoryId: newCategory[0].category_id,
                projectId: newCategory[0].project_id,
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding category: ${error.message}` };
    }
};

const _updateCategoryById = async () => {};

const _deleteCategoryById = async () => {};

const _getCategoriesByProjectId = async () => {};

module.exports = {
    _addCategory,
    _updateCategoryById,
    _deleteCategoryById,
    _getCategoriesByProjectId,
};
