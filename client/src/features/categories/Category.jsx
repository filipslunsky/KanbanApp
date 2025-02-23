import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { updateCategory, deleteCategory, resetUpdateCategoryStatus, resetDeleteCategoryStatus } from './state/slice';
import { setStatusMessage } from '../general/state/slice';
import TaskItem from '../tasks/TaskItem';
import './category.css';

const Category = ({categoryId, categoryName}) => {
    // global variables and states
    const dispatch = useDispatch();

    const updateCategoryStatus = useSelector(state => state.categories.updateCategoryStatus);
    const deleteCategoryStatus = useSelector(state => state.categories.deleteCategoryStatus);
    const nightMode = useSelector(state => state.general.nightMode);
    const tasks = useSelector(state => state.tasks.tasks);
    const tasksStatus = useSelector(state => state.tasks.tasksStatus);

    const { setNodeRef } = useDroppable({ id: categoryId });

    const categoryNameRef = useRef();

    const [updateCategoryClicked, setUpdateCategoryClicked] = useState(false);

    // category edit handlers
    const handleUpdateClick = () => {
        setUpdateCategoryClicked(true);
    };

    const handleUpdateClickCancel = () => {
        setUpdateCategoryClicked(false);
    };

    const handleUdpateClickOk = () => {
        dispatch(updateCategory({
            categoryId,
            categoryName: categoryNameRef.current.value,
        }));
        setUpdateCategoryClicked(false);
    };

    // category delete handlers
    const handleDeleteClickOk = () => {
        dispatch(deleteCategory({categoryId}));
    };

    // status messages for edit/delete category (column)
    useEffect(()=> {
            if (updateCategoryStatus === 'success') {
                dispatch(setStatusMessage({ text: "Project board updated.", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateCategoryStatus());
            } else if (updateCategoryStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to update project board. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateCategoryStatus());
            }
        }, [updateCategoryStatus]);
    
        useEffect(()=> {
            if (deleteCategoryStatus === 'success') {
                dispatch(setStatusMessage({ text: "Project board deleted.", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetDeleteCategoryStatus());
            } else if (deleteCategoryStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to delete project board. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetDeleteCategoryStatus());
            }
        }, [deleteCategoryStatus]);

        // tasks filtering
        const filteredTasks = tasksStatus === 'success' ? tasks.filter(item => item.category_id === categoryId) : [];

    return (
        <>
            <div className={nightMode ? "categoryTitleContainer nightMode" : "categoryTitleContainer"}>    
                {
                    updateCategoryClicked
                    ?
                    <div className="categoryActiveContainer">
                        <input
                        type="text"
                        defaultValue={categoryName}
                        ref={categoryNameRef}
                        className='categoryNameEditInput'
                        />
                        <div className="categoryActiveControlsContainer">
                            <button className="categoryConfirmButton" onClick={handleUdpateClickOk}>save</button>
                            <button className="categoryCancelButton" onClick={handleUpdateClickCancel}>cancel</button>
                            <button className="categoryConfirmButton" onClick={handleDeleteClickOk}>delete</button>
                        </div>
                    </div>
                    :
                    <h2 className="categoryTitle" onDoubleClick={handleUpdateClick} >{categoryName} ({filteredTasks.length})</h2>
                }
            </div>
            <div ref={setNodeRef} className="categoryTaskItemsContainer">
                <SortableContext items={tasks.map(task => task.task_id)}>
                    {
                        filteredTasks.map(item => {
                            return (
                                    <TaskItem taskItem={item} key={item.task_id}/>
                            )
                        })
                    }
                </SortableContext>
            </div>
        </>
    );
}
 
export default Category;