import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCorners } from "@dnd-kit/core";
import { updateTaskCategory } from '../tasks/state/slice.js';
import { getCategories } from './state/slice';
import { getTasks } from '../tasks/state/slice';
import Category from './Category';
import NewCategory from './NewCategory';
import './categories.css';

const Categories = () => {
    // global variables and states
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const categories = useSelector(state => state.categories.categories);
    const categoriesStatus = useSelector(state => state.categories.updateCategoryStatus);
    const updateCategoryStatus = useSelector(state => state.categories.updateCategoryStatus);
    const deleteCategoryStatus = useSelector(state => state.categories.deleteCategoryStatus);
    const addCategoryStatus = useSelector(state => state.categories.addCategoryStatus);
    const tasks = useSelector(state => state.tasks.tasks);
    const tasksStatus = useSelector(state => state.tasks.tasksStatus);
    const addTaskStatus = useSelector(state => state.tasks.addTaskStatus);
    const deleteTaskStatus = useSelector(state => state.tasks.deleteTaskStatus);
    const updateTaskStatus = useSelector(state => state.tasks.updateTaskStatus);
    const updateSubtaskStatus = useSelector(state => state.tasks.updateSubtaskStatus);
    const deleteSubtaskStatus = useSelector(state => state.tasks.deleteSubtaskStatus);
    const addSubtaskStatus = useSelector(state => state.tasks.addSubtaskStatus);
    const taskCategoryStatus = useSelector(state => state.tasks.taskCategoryStatus);

    // getting categories after loading and changing their items
    useEffect(() => {
        if (currentProjectId != null) {
            dispatch(getCategories({projectId: currentProjectId}));
        };
    }, [dispatch, currentProjectId, updateCategoryStatus, deleteCategoryStatus, addCategoryStatus]);

    // getting tasks after loading and changing their items
    useEffect(() => {
        if (currentProjectId !== null) {
            dispatch(getTasks({projectId: currentProjectId}));
        };
        }, [dispatch, currentProjectId, updateSubtaskStatus, deleteSubtaskStatus, addSubtaskStatus]);

    // drag and drop function
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
    
        const draggedTaskId = active.id;
        const newCategoryId = over.id;
    
        if (!categories.some(category => category.category_id === newCategoryId)) return;
    
        dispatch(updateTaskCategory({ taskId: draggedTaskId, categoryId: newCategoryId }));
    };

    if (categoriesStatus === 'loading') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Loading...</div>)
    };

    if (categoriesStatus === 'failed') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Failed to load categories. Please refresh or try again later.</div>)
    };

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>
                    {
                        categories.length > 0 && categories.map(item => {
                            return (
                                <div className="categoriesCategoryMainContainer" key={item.category_id}>
                                    <Category
                                    categoryId={item.category_id}
                                    categoryName={item.category_name}
                                    />
                                </div>
                            )
                        })
                    }
                    <NewCategory />
                </div>
            </DndContext>
        </>
    );
}
 
export default Categories;