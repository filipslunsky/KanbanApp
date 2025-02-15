import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import './boards.css';

const Boards = () => {
    const sideBar = useSelector(state => state.general.sideBar);
    const nightMode = useSelector(state => state.general.nightMode);

    return (
        <>
            <div className={nightMode ? "boardsMainContainer nightMode" : "boardsMainContainer"}>
                {sideBar && <Sidebar />}
                <div className="boardsRightContainer">
                    <Navbar />
                </div>
            </div>
        </>
    );
}
 
export default Boards;