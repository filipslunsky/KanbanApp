import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo";
import './sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebarMainContainer">
                <Logo />

            </div>
        </>
    );
}
 
export default Sidebar;