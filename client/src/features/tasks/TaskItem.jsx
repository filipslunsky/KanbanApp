import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskItem.css';

const TaskItem = ({taskItem}) => {
    const subtasksTotal = taskItem.subtasks.length;

    const subtasksFinished = taskItem.subtasks.filter(item => item.is_completed === true).length;

    return (
        <>
            <div className="taskItemLeftContainer">
                <img src={verticalBurgerIcon} alt="icon" className="dragNDropIcon" />
            </div>
            <div className="taskItemRightContainer">
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