import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskItem.css';

const TaskItem = ({taskItem}) => {
    return (
        <>
            <img src={verticalBurgerIcon} alt="icon" className="dragNDropIcon" />
            <span className="taskItemName">Test Hard Name</span>
            <span className="taskItemSubtasksStatus">0 of 3 subtasks</span>
        </>
    );
}
 
export default TaskItem;