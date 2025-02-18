import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNewTaskWindow, setStatusMessage } from '../general/state/slice.js';
import { addTask, resetAddTaskStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './taskDetail.css';

const TaskDetail = () => {
    // global variables and states
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.categories);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const addTaskStatus = useSelector(state => state.tasks.addTaskStatus);
    const nightMode = useSelector(state => state.general.nightMode);

    const nameRef = useRef();
    const desriptionRef = useRef();
    const categoryRef = useRef();
    const newSubtaskNameRef = useRef();
    // const updatedSubtaskNameRef = useRef();

    const [newSubtask, setNewSubtask] = useState(false);
    const [subtasksArr, setSubtasksArr] = useState([]);

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

        // subtasks button click handlers
    const handleNewSubtaskClick = () => {
        setNewSubtask(true);
    };

    const handleNewSubtaskCancelClick = () => {
        setNewSubtask(false);
    };

    const handleNewSubtaskAdd = () => {
        if (newSubtaskNameRef.current.value.length === 0) return;
        setSubtasksArr(prev => [...prev, newSubtaskNameRef.current.value]);
        setNewSubtask(false);
    };

    const handleRemoveSubtask = (index) => {
        setSubtasksArr(prev => prev.filter((_, i) => i !== index));
    };
    
    // const handleUpdateSubtask = (index) => {
    //     setSubtasksArr(prev => prev.map((item, i) => i === index ? updatedSubtaskNameRef.current.value : item));
    // };

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
                <div className={nightMode ? "newTaskMainContainer nightMode" : "newTaskMainContainer"}>
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
                    <div className="newTaskSubtasksContainer">
                        <span className="newTaskInputLable">Subtasks</span>
                        <div className="newTaskSubtasksItems">
                            {
                                subtasksArr.map((item, index) => {
                                    return (
                                        <div className="newTaskSubtasItemContainer" key={index}>
                                            <span className="newTaskSubtasName">{item}</span>
                                            <button className="newTaskRemoveSubtaskButton" onClick={() => {handleRemoveSubtask(index)}}>
                                                <img src={crossIcon} alt="icon" className="newTaskCrossIcon" />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                           newSubtask
                           ?
                           <div className="newTaskSubtaskActiveContainer">
                                <input type="text" className="newTaskInput" ref={newSubtaskNameRef} />
                                <div className="newTaskSubtaskActiveControlsContainer">
                                    <button className="newTaskSubtaskButton" onClick={handleNewSubtaskAdd}>Add</button>
                                    <button className="newTaskSubtaskButton" onClick={handleNewSubtaskCancelClick}><img src={crossIcon} alt="icon" className="newTaskCrossIcon" /></button>
                                </div>
                           </div>
                           :
                           <button className="newTaskAddSubtaskButton" onClick={handleNewSubtaskClick}>+ Add New Subtask</button>
                        }
                    </div>
                    <div className="newTaskInputContainer">
                        <span className="newTaskInputLable">Status</span>
                        <select className='newTaskInput' name="category" id="newItemCategory" ref={categoryRef}>
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
 
export default TaskDetail;