import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditTaskWindow, setStatusMessage } from '../general/state/slice.js';
import { updateTask, deleteTask, addSubtask, updateSubtask, deleteSubtask, resetUpdateTaskStatus, resetDeleteTaskStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskDetail.css';

const TaskDetail = () => {
    // global variables and states
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);
    const updateTaskStatus = useSelector(state => state.tasks.updateTaskStatus);
    const deleteTaskStatus = useSelector(state => state.tasks.deleteTaskStatus);
    // const addSubtaskStatus = useSelector(state => state.tasks.addSubtaskStatus);
    // const updateSubtaskStatus = useSelector(state => state.tasks.updateSubtaskStatus);
    // const deleteSubtaskStatus = useSelector(state => state.tasks.deleteSubtaskStatus);


    // button click handlers

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
                        <h2 className="taskDetailHeader">Task name - add dynamically</h2>
                        <button className="taskDetailCancelButton"><img src={verticalBurgerIcon} alt="icon" className="taskDetailVerticalBurgerIcon" /></button>
                        <button className="taskDetailCancelButton"><img src={crossIcon} alt="icon" className="taskDetailCrossIcon" /></button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default TaskDetail;