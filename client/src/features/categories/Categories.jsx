import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
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
        }, [dispatch, currentProjectId, addTaskStatus, deleteTaskStatus, updateSubtaskStatus, updateTaskStatus, deleteSubtaskStatus, addSubtaskStatus]);

    if (categoriesStatus === 'loading') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Loading...</div>)
    };

    if (categoriesStatus === 'failed') {
        return (<div className={nightMode ? "categoriesMainContainer nightMode" : "categoriesMainContainer"}>Failed to load categories. Please refresh or try again later.</div>)
    };

    return (
        <>
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
        </>
    );
}
 
export default Categories;