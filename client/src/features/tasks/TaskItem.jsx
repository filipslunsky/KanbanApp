import { useDispatch } from 'react-redux';
import { setCurrentTask, toggleEditTaskWindow } from '../general/state/slice';
import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskItem.css';

const TaskItem = ({taskItem}) => {
    const dispatch = useDispatch();

    const handleClickTask = () => {
        dispatch(setCurrentTask({taskItem}));
        dispatch(toggleEditTaskWindow());
    };

    const subtasksTotal = taskItem.subtasks.length;

    const subtasksFinished = taskItem.subtasks.filter(item => item.is_completed === true).length;

    return (
        <>
            <div className="taskItemLeftContainer">
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
        </>
    );
}
 
export default TaskItem;