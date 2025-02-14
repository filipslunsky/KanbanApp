import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo";
import Projects from "./Projects";
import './sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebarMainContainer">
                <Logo />
                <Projects />
            </div>
        </>
    );
}
 
export default Sidebar;