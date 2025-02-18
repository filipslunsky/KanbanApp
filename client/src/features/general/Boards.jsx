import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Categories from "../categories/Categories";
import NewTask from "../tasks/NewTask";
import TaskDetail from "../tasks/TaskDetail";
import './boards.css';

const Boards = () => {
    const sideBar = useSelector(state => state.general.sideBar);
    const nightMode = useSelector(state => state.general.nightMode);
    const newTaskWindow = useSelector(state => state.general.newTaskWindow);
    const editTaskWindow = useSelector(state => state.general.editTaskWindow);

    return (
        <>
            <div className={
                nightMode
                ?
                    newTaskWindow || editTaskWindow
                    ?
                    "boardsMainContainer nightMode darkenInactive"
                    :
                    "boardsMainContainer nightMode"
                :
                    newTaskWindow || editTaskWindow
                    ?
                    "boardsMainContainer darkenInactive"
                    :
                    "boardsMainContainer"
                }>
                {sideBar && <Sidebar />}
                <div className="boardsRightContainer">
                    <Navbar />
                    <Categories />
                </div>
            </div>
            {newTaskWindow && <NewTask />}
            {editTaskWindow && <TaskDetail />}
        </>
    );
}
 
export default Boards;