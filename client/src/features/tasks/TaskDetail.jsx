import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditTaskWindow, setStatusMessage, setCurrentTaskId } from '../general/state/slice.js';
import { updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask, resetUpdateTaskStatus, resetDeleteTaskStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './taskDetail.css';

const TaskDetail = () => {
    // global variables and states
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);
    const updateTaskStatus = useSelector(state => state.tasks.updateTaskStatus);
    const deleteTaskStatus = useSelector(state => state.tasks.deleteTaskStatus);
    const currentTaskId = useSelector(state => state.general.currentTaskId);
    const categories = useSelector(state => state.categories.categories);
    const tasks = useSelector(state => state.tasks.tasks);
    // const addSubtaskStatus = useSelector(state => state.tasks.addSubtaskStatus);
    // const updateSubtaskStatus = useSelector(state => state.tasks.updateSubtaskStatus);
    // const deleteSubtaskStatus = useSelector(state => state.tasks.deleteSubtaskStatus);

    const [editTaskName, setEditTaskName] = useState(false);
    const [editTaskDescription, setEditTaskDescription] = useState(false);
    const [taskDelete, setTaskDelete] = useState(false);
    const [subtaskEdit, setSubtaskEdit] = useState(0);
    const [addNewSubtask, setAddNewSubtask] = useState(false);

    const taskNameRef = useRef();
    const taskDescriptionRef = useRef();
    const subtaskNameRef = useRef();
    const taskCategoryRef = useRef();
    const newSubtaskNameRef = useRef();

    const currentTask = tasks.filter(item => item.task_id === currentTaskId)[0];

    const tasksCompleted = currentTask.subtasks.filter(item => item.is_completed === true);

    // button click handlers
    const handleClickClose = () => {
        dispatch(toggleEditTaskWindow());
    };

    const handleTaskNameClick = () => {
        setEditTaskName(true);
        setEditTaskDescription(false);
        setTaskDelete(false);
        setSubtaskEdit(0);
        setAddNewSubtask(false);
    };

    const handleTaskDescriptionClick = () => {
        setEditTaskDescription(true);
        setEditTaskName(false);
        setTaskDelete(false);
        setSubtaskEdit(0);
        setAddNewSubtask(false);
    };

    const handleDeleteClick = () => {
        setTaskDelete(true);
        setEditTaskName(false);
        setEditTaskDescription(false);
        setSubtaskEdit(0);
        setAddNewSubtask(false);
    };

    const handleDeleteClickCancel = () => {
        setTaskDelete(false);
    };

    const handleDeleteClickConfirm = () => {
        dispatch(deleteTask({taskId: currentTask.task_id}));
        dispatch(toggleEditTaskWindow());
    };

    const handleUpdateTask = () => {
        const updateItem = {
            taskId: currentTask.task_id,
            taskName: taskNameRef.current ? taskNameRef.current.value : currentTask.task_name,
            taskDescription: taskDescriptionRef.current ? taskDescriptionRef.current.value : currentTask.task_description,
            categoryId: taskCategoryRef.current ? taskCategoryRef.current.value : currentTask.category_id,
        };

        dispatch(updateTask(updateItem));
        setEditTaskName(false);
        setEditTaskDescription(false);
        setSubtaskEdit(0);
        setAddNewSubtask(false);
    };
    
        // subtasks button click handlers
    const handleUpdateSubtask = (subtaskId, subtaskName, isCompleted) => {
        dispatch(updateSubtask({subtaskId, subtaskName, isCompleted}));
        setSubtaskEdit(0);
        setAddNewSubtask(false);
    };

    const handleSubtaskNameClick = (subtaskId) => {
        setSubtaskEdit(subtaskId);
        setAddNewSubtask(false);
        setTaskDelete(true);
        setEditTaskName(false);
        setEditTaskDescription(false);
    };

    const handleClickAddNewSubtask = () => {
        setAddNewSubtask(true);
        setTaskDelete(false);
        setEditTaskName(false);
        setEditTaskDescription(false);
        setSubtaskEdit(0);
    };

    const handleAddNewSubtaskOk = () => {
        if (newSubtaskNameRef.current.value === '') return;
        const newSubtaskItem = {
            taskId: currentTask.task_id,
            subtaskName: newSubtaskNameRef.current.value,
            isCompleted: false,
        };
        dispatch(addSubtask(newSubtaskItem));
        setAddNewSubtask(false);
    };

    const handleDeleteSubtask = (subtaskId) => {
        dispatch(deleteSubtask({subtaskId}));
    };

    
    // status message for updateTask
    useEffect(()=> {
        if (updateTaskStatus === 'success') {
            dispatch(setStatusMessage({ text: "Task successfully updated.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetUpdateTaskStatus());
        } else if (updateTaskStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to update task. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetUpdateTaskStatus());
        }
    }, [updateTaskStatus]);

    useEffect(()=> {
        if (deleteTaskStatus === 'success') {
            dispatch(setStatusMessage({ text: "Task successfully deleted.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetDeleteTaskStatus());
        } else if (deleteTaskStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to delete task. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetDeleteTaskStatus());
        }
    }, [deleteTaskStatus]);

    return (
        <>
            <div className="taskDetailOuterContainer">
                <div className={nightMode ? "taskDetailMainContainer nightMode" : "taskDetailMainContainer"}>
                    <div className="taskDetailHeaderContainer">
                        {
                            editTaskName
                            ?
                            <div className="taskDetaitEditNameContainer">
                                <input type="text" className="taskDetailEditNameInput" defaultValue={currentTask.task_name} ref={taskNameRef} />
                                <button className="taskDetailEditConfirmButton" onClick={handleUpdateTask}>ok</button>
                            </div>
                            :
                            <h2 className="taskDetailHeader" onDoubleClick={handleTaskNameClick}>{currentTask.task_name}</h2>
                        }
                        <button className="taskDetailCancelButton" onClick={handleClickClose}><img src={crossIcon} alt="icon" className="taskDetailCrossIcon" /></button>
                    </div>
                    <div className="taskDetailTaskDescriptionContainer">
                        <span className="taskDetailLable">Description</span>
                        {
                            editTaskDescription
                            ?
                            <div className="taskDetaitEditDescriptionContainer">
                                <textarea  className="taskDetailEditDescriptionInput" defaultValue={currentTask.task_description} ref={taskDescriptionRef} />
                                <button className="taskDetailEditConfirmButton" onClick={handleUpdateTask}>ok</button>
                            </div>
                            :
                            <span className="taskDetailTaskDescriptionText" onDoubleClick={handleTaskDescriptionClick}>
                                {currentTask.task_description}
                            </span>
                        }
                    </div>
                    <div className="taskDetailSubtasksContainer">
                        <span className="taskDetailLable">Subtasks {currentTask.subtasks.length > 0 && `(${tasksCompleted.length} of ${currentTask.subtasks.length})`}</span>
                        <div className="taskDetailSubtaskItemsConatianer">
                            {
                                currentTask.subtasks.map(item => {
                                    return (
                                        <div className="taskDetailSubtaskItemContainer" key={item.subtask_id}>
                                            <input
                                            type="checkbox"
                                            className="taskDetailSubtaskCheckBox"
                                            defaultChecked={item.is_completed ? true : false}
                                            onChange={() => {handleUpdateSubtask(item.subtask_id, item.subtask_name, !item.is_completed)}}
                                            />
                                            {
                                                item.subtask_id == subtaskEdit
                                                ?
                                                <div className="taskDetaitEditNameContainer">
                                                    <input type="text" className="taskDetailEditSubtaskNameInput" defaultValue={item.subtask_name} ref={subtaskNameRef} />
                                                    <button className="taskDetailEditConfirmButton" onClick={() => {handleUpdateSubtask(item.subtask_id, subtaskNameRef.current.value, item.is_completed)}}>ok</button>
                                                </div>
                                                :
                                                <span className="taskDetailSubtaskName" onDoubleClick={() => {handleSubtaskNameClick(item.subtask_id)}}>{item.subtask_name}</span>
                                            }
                                            <button className="taskDetailSubtaskDelete" onClick={() => {handleDeleteSubtask(item.subtask_id)}}>
                                                <img src={crossIcon} alt="icon" className="taskDetailCrossIcon" />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            {
                                addNewSubtask
                                ?
                                <div className="taskDetailAddSubtaskActiveContainer">
                                    <input type="text" className="taskDetailAddSubtaskNameInput" ref={newSubtaskNameRef} />
                                    <button className="taskDetailEditConfirmButton" onClick={handleAddNewSubtaskOk}>ok</button>
                                </div>
                                :
                                <button className="taskDetailAddSubtaskButton" onClick={handleClickAddNewSubtask}>+ Add Subtask</button>
                            }
                        </div>
                    </div>
                    <div className="taskDetailCategoryContainer">
                        <select className='newTaskInput' name="category" id="newItemCategory" ref={taskCategoryRef} defaultValue={currentTask.category_id} onChange={handleUpdateTask}>
                                {
                                    categories.map(item => {
                                        return (
                                            <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                        )
                                    })
                                }
                        </select>
                    </div>
                    <div className="taskDetailDeleteContainer">
                        {
                            taskDelete
                            ?
                            <div className="taskDetailDeleteActiveContainer">
                                <span className='taskDetailConfirmQuestion'>Delete task forever?</span>
                                <div className="taskDetailDeleteButtonsContainer">
                                    <button className="taskDetailDeleteConfirmButton" onClick={handleDeleteClickConfirm}>Yes</button>
                                    <button className="taskDetailDeleteConfirmButton" onClick={handleDeleteClickCancel}>No</button>
                                </div>
                            </div>
                            :
                            <button className="taskDetailDeleteButton" onClick={handleDeleteClick}>Delete Task</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default TaskDetail;