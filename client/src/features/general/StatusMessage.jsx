import { useSelector } from 'react-redux';
import './statusMessage.css';

const StatusMessage = () => {
    const statusMessage = useSelector(state => state.general.statusMessage);

    return (
        <>
        <div className="statusMessageMainContainer">
            <span className='statusMessageText'>{statusMessage.text}</span>
        </div>
        </>
    );
}
 
export default StatusMessage;