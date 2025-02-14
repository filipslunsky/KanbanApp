import { useSelector } from 'react-redux';
import logoLight from '../../assets/img/logo-light.svg';
import logoDark from '../../assets/img/logo-dark.svg';
import logoMobile from '../../assets/img/logo-mobile.svg';
import './logo.css';

const Logo = () => {
    return (
        <>
            <img src={logoDark} alt="light logo" />
        </>
    );
}
 
export default Logo;