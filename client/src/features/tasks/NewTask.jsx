import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNewTaskWindow, setStatusMessage } from '../general/state/slice.js';
import { addTask, resetAddTaskStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './newTask.css';

const NewTask = () => {
    // global variables and states
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.categories);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const addTaskStatus = useSelector(state => state.tasks.addTaskStatus);

    const nameRef = useRef();
    const desriptionRef = useRef();
    const categoryRef = useRef();

    // button click handlers
    const handleClickCancel = () => {
        dispatch(toggleNewTaskWindow());
    };

    const handleClickCreate = () => {
        const addItem = {
            taskName: nameRef.current.value,
            taskDescription: desriptionRef.current.value,
            categoryId: categoryRef.current.value,
            projectId: currentProjectId,
            subtasks: [],
        };

        dispatch(addTask(addItem));
        dispatch(toggleNewTaskWindow());
    };

    // status message for addTask
        useEffect(()=> {
            if (addTaskStatus === 'success') {
                dispatch(setStatusMessage({ text: "New project board created.", visible: true, style: 'success' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetAddTaskStatus());
            } else if (addTaskStatus === 'failed') {
                dispatch(setStatusMessage({ text: "Failed to create new project board. Please try again.", visible: true, style: 'failed' }));
                setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
                dispatch(resetAddTaskStatus());
            }
        }, [addTaskStatus]);

    return (
        <>
            <div className="newTaskOuterContainer">
                <div className="newTaskMainContainer">
                    <div className="newTaskHeaderContainer">
                        <h2 className="newTaskHeader">Add New Task</h2>
                        <button className="newTaskCancelButton" onClick={handleClickCancel}><img src={crossIcon} alt="icon" className="newTaskCrossIcon" /></button>
                    </div>
                    <div className="newTaskInputContainer">
                        <span className="newTaskInputLable">Title</span>
                        <input type="text" className="newTaskInput" ref={nameRef} />
                    </div>
                    <div className="newTaskInputContainer">
                        <span className="newTaskInputLable">Description</span>
                        <textarea type="text" className="newTaskInput" ref={desriptionRef} />
                    </div>
                    <div className="newTaskInputContainer">
                        <span className="newTaskInputLable">Status</span>
                        <select name="category" id="newItemCategory" ref={categoryRef}>
                            {
                                categories.map(item => {
                                    return (
                                        <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className='newTaskCreateButton' onClick={handleClickCreate}>Create Task</button>
                </div>
            </div>
        </>
    );
}
 
export default NewTask;