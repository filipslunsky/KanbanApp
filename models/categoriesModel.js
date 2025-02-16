const { db } = require('../config/db.js');

const _addCategory = async (categoryName, projectId) => {
    try {
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
                    category: newCategory[0],
                };
            });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding category: ${error.message}` };
    }
};

const _updateCategoryById = async (categoryId, categoryName) => {
    try {
        return await db.transaction(async (trx) => {
            const category = await trx('categories')
                .select('category_id')
                .where({ category_id: categoryId })
                .first();

            if (!category) {
                return { success: false, message: 'Category not found' };
            };

            const updatedCategory = await trx('categories')
            .update({
                category_name: categoryName
            })
            .where({category_id: category.category_id})
            .returning(['category_name', 'category_id', 'project_id']);

            return { 
                success: true, 
                message: 'Category successfully updated',
                category: updatedCategory[0],
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating category: ${error.message}` };
    }
};

const _deleteCategoryById = async (categoryId) => {
    try {
        return await db.transaction(async (trx) => {
            const category = await trx('categories')
                .select('category_id')
                .where({ category_id: categoryId })
                .first();

            if (!category) {
                return { success: false, message: 'Category not found' };
            };

            await trx('categories')
            .delete()
            .where({category_id: category.category_id});

            return { 
                success: true, 
                message: 'Category successfully deleted',
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting category: ${error.message}` };
    }
};

const _getCategoriesByProjectId = async (projectId) => {
    try {
        return await db.transaction(async (trx) => {
            const project = await trx('projects')
                .select('project_id')
                .where({ project_id: projectId })
                .first();

            if (!project) {
                return { success: false, message: 'Project not found' };
            };

            const categories = await trx('categories')
            .select('category_id', 'category_name', 'project_id')
            .where({project_id: project.project_id})
            .orderBy('category_id', 'asc');

            return { 
                success: true, 
                categories,
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error fetching categories: ${error.message}` };
    }
};

module.exports = {
    _addCategory,
    _updateCategoryById,
    _deleteCategoryById,
    _getCategoriesByProjectId,
};
