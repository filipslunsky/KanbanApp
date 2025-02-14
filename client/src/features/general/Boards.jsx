import Sidebar from "./Sidebar";
import './boards.css';

const Boards = () => {
    return (
        <>
            <div className="boardsMainContainer">
                <Sidebar />
                <div className="boardsRightContainer"></div>
            </div>
        </>
    );
}
 
export default Boards;