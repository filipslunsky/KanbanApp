import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

    const categoryNameRef = useRef();

    const [updateCategoryClicked, setUpdateCategoryClicked] = useState(false);
    const [deleteCategoryClicked, setDeleteCategoryClicked] = useState(false);

    // category edit handlers
    const handleUpdateClick = () => {
        setUpdateCategoryClicked(true);
        setDeleteCategoryClicked(false);
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
    const handleDeleteClick = () => {
        setDeleteCategoryClicked(true);
        setUpdateCategoryClicked(false);
    };

    const handleDeleteClickCancel = () => {
        setDeleteCategoryClicked(false);
    };

    const handleDeleteClickOk = () => {
        dispatch(deleteCategory({categoryId}));
        setDeleteCategoryClicked(false);
    };

    // status messages for edit/delete category (column)
    useEffect(()=> {
            if (updateCategoryStatus === 'success') {
                dispatch(setStatusMessage({ text: "New project board created.", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateCategoryStatus());
            } else if (updateCategoryStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to create new project board. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetUpdateCategoryStatus());
            }
        }, [updateCategoryStatus]);
    
        useEffect(()=> {
            if (deleteCategoryStatus === 'success') {
                dispatch(setStatusMessage({ text: "New project board created.", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetDeleteCategoryStatus());
            } else if (deleteCategoryStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to create new project board. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetDeleteCategoryStatus());
            }
        }, [deleteCategoryStatus]);

        // tasks filtering
        const filteredTasks = tasksStatus === 'success' ? tasks.filter(item => item.category_id === categoryId) : [];

    return (
        <>
            <div className={nightMode ? "categoryTitleContainer nightMode" : "categoryTitleContainer"}>
                <h2 className="categoryTitle">{categoryName} (0)</h2>
                <div className="categoryControlsContainer">
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
                            <button className="categoryConfirmButton" onClick={handleUdpateClickOk}>save</button>
                            <button className="categoryCancelButton" onClick={handleUpdateClickCancel}>cancel</button>
                        </div>
                        :
                        <button className="categoryHeaderButton" onClick={handleUpdateClick}>edit</button>
                    }
                    {
                        deleteCategoryClicked
                        ?
                        <div className="categoryActiveContainer">
                            <span className="categoryConfirmQuestion">Delete this column?</span>
                            <button className="categoryCancelButton" onClick={handleDeleteClickCancel}>no</button>
                            <button className="categoryConfirmButton" onClick={handleDeleteClickOk}>yes</button>
                        </div>
                        :
                        <button className="categoryHeaderButton" onClick={handleDeleteClick}>delete</button>
                    }
                </div>
            </div>
            <div className="categoryTaskItemsContainer">
                {
                    filteredTasks.map(item => {
                        return (
                            <div className="taskItemContainer" key={item.task_id}>
                                <TaskItem taskItem={item} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
 
export default Category;