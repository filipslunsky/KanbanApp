import { useSelector, useDispatch } from "react-redux";
import { toggleSideBar, toggleNewTaskWindow, toggleProfileDetailWindow } from "./state/slice";
import Logo from "./Logo";
import plusIcon from '../../assets/img/icon-add-task-mobile.svg';
import slimBurgerIcon from '../../assets/img/icon-vertical-ellipsis.svg';
import './navbar.css';

const Navbar = () => {
    // global variables
    const dispatch = useDispatch();

    const sideBar = useSelector(state => state.general.sideBar);
    const nightMode = useSelector(state => state.general.nightMode);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const projects = useSelector(state => state.general.projects);
    const projectsStatus = useSelector(state => state.general.projectsStatus);


    // extracting currentProject object from projects
    const getCurrentProject = () => {
        if (projectsStatus === 'success' && projects.length > 0) {
            return projects.filter(item => item.project_id == currentProjectId);
        } else {
            return [];
        }
    };

    const currentProject = getCurrentProject();

    // onClick button handlers
    const handleShowSideBar = () => {
        dispatch(toggleSideBar());
    };

    const handleAddNewButtonClick = () => {
        dispatch(toggleNewTaskWindow());
    };

    const handleProfileWindowClick = () => {
        dispatch(toggleProfileDetailWindow());
    };

    return (
        <>
            <div className={nightMode ? "navbarMainContainer nightMode" : "navbarMainContainer"}>
                <div className="navbarLeftContainer">
                    {!sideBar && <button className="showSideBarButton" onClick={handleShowSideBar}><Logo /></button>}
                    <h2 className="navbarProjectHeader">
                        {
                            currentProject.length > 0
                            ?
                            currentProject[0].project_name
                            :
                            ''
                        }
                        </h2>
                </div>
                <div className="navbarRightContainer">
                <button className="navbarAddTaskButton" onClick={handleAddNewButtonClick}>
                    <img src={plusIcon} alt="plus" className="navbarAddTaskMobileIcon" />
                    <span className="navbarAddTaskLable">+ Add New Task</span>
                </button>
                <button className="navbarProfileButton" onClick={handleProfileWindowClick}>
                    <img src={slimBurgerIcon} alt="burger icon" className="navbarShowProfileIcon" />
                </button>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;