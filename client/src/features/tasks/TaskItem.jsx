import verticalBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './taskItem.css';

const TaskItem = ({taskItem}) => {
    console.log(taskItem);
    const subtasksTotal = taskItem.subtasks.length;

    const subtasksFinished = taskItem.subtasks.filter(item => item.is_completed === true).length;

    return (
        <>
            <img src={verticalBurgerIcon} alt="icon" className="dragNDropIcon" />
            <span className="taskItemName">{taskItem.task_name}</span>
            {
                subtasksTotal > 0 && <span className="taskItemSubtasksStatus">
                    {subtasksFinished} of {subtasksTotal}
                    {subtasksTotal === 1 ? ' task' : ' tasks'}
                    </span>
            }
        </>
    );
}
 
export default TaskItem;