import { useSelector } from 'react-redux';
import logoLight from '../../assets/img/logo-light.svg';
import logoDark from '../../assets/img/logo-dark.svg';
import logoMobile from '../../assets/img/logo-mobile.svg';
import './logo.css';

const Logo = () => {
    const nightMode = useSelector(state => state.general.nightMode);

    return (
        <>
            <img className='logoImageLarge' src={nightMode ? logoLight : logoDark} alt="logo" />
            <img className='logoImageSmall' src={logoMobile} alt="logo" />
        </>
    );
}
 
export default Logo;