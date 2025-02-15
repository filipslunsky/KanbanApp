import { useSelector, useDispatch } from "react-redux";
import { toggleNightMode, toggleSideBar } from "./state/slice";
import Logo from "./Logo";
import Projects from "./Projects";
import lightThemeIcon from '../../assets/img/icon-light-theme.svg';
import darkThemeIcon from '../../assets/img/icon-dark-theme.svg';
import hideSideBarIcon from '../../assets/img/icon-hide-sidebar.svg';
import './sidebar.css';

const Sidebar = () => {
    // global variables
    const dispatch = useDispatch();
    const nightMode = useSelector(state => state.general.nightMode);

    const handleToggleNightMode = () => {
        dispatch(toggleNightMode());
    };

    const handleToggleSideBar = () => {
        dispatch(toggleSideBar());
    };

    return (
        <>
            <div className={nightMode ? "sidebarMainContainer nightMode" : "sidebarMainContainer"}>
                <Logo />
                <Projects />
                <div className="sidebarControlsContainer">
                    <div className="nightModeSwitchContainer">
                        <img src={lightThemeIcon} alt="icon" className="nightModeIcon" />
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={handleToggleNightMode}
                            />
                            <span className="slider"></span>
                        </label>
                        <img src={darkThemeIcon} alt="icon" className="nightModeIcon" />
                    </div>
                    <div className="hideSideBarContainer">
                        <button className="hideSidebarButton" onClick={handleToggleSideBar}><img src={hideSideBarIcon} alt="icon" className="hideSideBarIcon" />Hide Sidebar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Sidebar;