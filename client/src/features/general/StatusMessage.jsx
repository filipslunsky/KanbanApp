import { useSelector } from 'react-redux';
import './statusMessage.css';

const StatusMessage = () => {
    const statusMessage = useSelector(state => state.general.statusMessage);
    console.log(statusMessage);

    return (
        <>
        <div className={`statusMessageMainContainer ${statusMessage.style}`}>
            <span className='statusMessageText'>{statusMessage.text}</span>
        </div>
        </>
    );
}
 
export default StatusMessage;