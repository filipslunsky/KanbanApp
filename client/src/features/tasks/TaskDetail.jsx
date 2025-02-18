import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditTaskWindow, setStatusMessage } from '../general/state/slice.js';
import { updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask, resetUpdateTaskStatus, resetDeleteTaskStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './taskDetail.css';

const TaskDetail = () => {
    // global variables and states
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);
    const updateTaskStatus = useSelector(state => state.tasks.updateTaskStatus);
    const deleteTaskStatus = useSelector(state => state.tasks.deleteTaskStatus);
    const currentTask = useSelector(state => state.general.currentTask);
    // const addSubtaskStatus = useSelector(state => state.tasks.addSubtaskStatus);
    // const updateSubtaskStatus = useSelector(state => state.tasks.updateSubtaskStatus);
    // const deleteSubtaskStatus = useSelector(state => state.tasks.deleteSubtaskStatus);

    const [editTaskName, setEditTaskName] = useState(false);
    const [editTaskDescription, setEditTaskDescription] = useState(false);
    const [taskDelete, setTaskDelete] = useState(false);

    const tasksCompleted = currentTask.subtasks.filter(item => item.is_completed === true);

    console.log(currentTask);

    // button click handlers
    const handleClickClose = () => {
        dispatch(toggleEditTaskWindow());
    };

    const handleTaskNameClick = () => {
        setEditTaskName(true);
        setEditTaskDescription(false);
        setTaskDelete(false);
    };

    const handleTaskDescriptionClick = () => {
        setEditTaskDescription(true);
        setEditTaskName(false);
        setTaskDelete(false);
    };

    const handleDeleteClick = () => {
        setTaskDelete(true);
        setEditTaskName(false);
        setEditTaskDescription(false);
    };

    const handleDeleteClickCancel = () => {
        setTaskDelete(false);
    };

    const handleDeleteClickConfirm = () => {
        dispatch(deleteTask({taskId: currentTask.task_id}));
        dispatch(toggleEditTaskWindow());
    };
    
        // subtasks button click handlers
    
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
                            ''
                            :
                            <h2 className="taskDetailHeader" onClick={handleTaskNameClick}>{currentTask.task_name}</h2>
                        }
                        <button className="taskDetailCancelButton" onClick={handleClickClose}><img src={crossIcon} alt="icon" className="taskDetailCrossIcon" /></button>
                    </div>
                    <div className="taskDetailTaskDescriptionContainer">
                        {
                            editTaskDescription
                            ?
                            ''
                            :
                            <span className="taskDetailTaskDescriptionText" onClick={handleTaskDescriptionClick}>
                                {currentTask.task_description}
                            </span>
                        }
                    </div>
                    <div className="taskDetailSubtasksContainer">
                        <span className="taskDetailLable">Subtasks {currentTask.subtasks.length > 0 && `(${tasksCompleted.length} of ${currentTask.subtasks.length})`}</span>
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