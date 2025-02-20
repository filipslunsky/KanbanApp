import { useDispatch, useSelector } from 'react-redux';
import { useDraggable } from "@dnd-kit/core";
import { setCurrentTaskId, toggleEditTaskWindow } from '../general/state/slice';
import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskItem.css';

const TaskItem = ({taskItem}) => {
    const dispatch = useDispatch();

    const nightMode = useSelector(state => state.general.nightMode);

    const handleClickTask = () => {
        dispatch(setCurrentTaskId(taskItem.task_id));
        dispatch(toggleEditTaskWindow());
    };

    // drag item variables
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: taskItem.task_id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    // calculate finished/unfinished subtasks
    const subtasksTotal = taskItem.subtasks.length;

    const subtasksFinished = taskItem.subtasks.filter(item => item.is_completed === true).length;

    return (
        <>  
            <div  ref={setNodeRef} style={style} {...attributes}  className={nightMode ? "taskItemContainer nightMode" : "taskItemContainer"} >
                <div className="taskItemLeftContainer" {...listeners}>
                    <img src={verticalBurgerIcon} alt="icon" className="dragNDropIcon" />
                </div>
                <div className="taskItemRightContainer" onClick={handleClickTask}>
                    <span className="taskItemName">{taskItem.task_name}</span>
                    {
                        subtasksTotal > 0 && <span className="taskItemSubtasksStatus">
                            {subtasksFinished} of {subtasksTotal}
                            {subtasksTotal === 1 ? ' task' : ' tasks'}
                            </span>
                    }
                </div>
            </div>
        </>
    );
}
 
export default TaskItem;