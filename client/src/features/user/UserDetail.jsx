import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProfileDetailWindow } from '../general/state/slice.js';
import { logoutUser, editUserInfo, editUserPassword, deleteUser } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './userDetail.css';

const UserDetail = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [logout, setLogout] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const handleClickClose = () => {
        dispatch(toggleProfileDetailWindow());
    };

    const handleEditInfoClick = () => {
        setEditInfo(true);
        setEditPassword(false);
        setLogout(false);
        setDeleteAccount(false);
    };

    const handleEditUserInfo = () => {
        if (firstNameRef.current.value === '' || lastNameRef.current.value === '') return;
        dispatch(editUserInfo({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: user.email,
        }));
        setEditInfo(false);
    };

    const handleEditPasswordClick = () => {
        setEditInfo(false);
        setEditPassword(true);
        setLogout(false);
        setDeleteAccount(false);
    };

    const handleLogoutClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(true);
        setDeleteAccount(false);
    };

    const handleDeleteClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(false);
        setDeleteAccount(true);
    };

    const handleCancelClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(false);
        setDeleteAccount(false);
    };


    return (
        <>
            <div className="userDetailOuterContainer">
                <div className="userDetailMainContainer">
                    <div className="userDetailHeaderContainer">
                        <h2 className="userDetailHeading">User Information</h2>
                        <button className="userDetailCloseButton" onClick={handleClickClose}><img src={crossIcon} alt="icon" /></button>
                    </div>
                    <div className="userDetailInfoContainer">
                        {
                            editInfo
                            ?
                            <div className="userDetailActiveContainer">
                                <input type="text" ref={firstNameRef} defaultValue={user.firstName} />
                                <input type="text" ref={lastNameRef} defaultValue={user.lastName} />
                                <button className="userDetailControlButton" onClick={handleEditUserInfo}>OK</button>
                                <button className="userDetailControlButton" onClick={handleCancelClick}>cancel</button>
                            </div>
                            :
                                <span className="userDetailName" onDoubleClick={handleEditInfoClick}>{user.firstName} {user.lastName}</span>
                        }
                        <span className="userDetailEmail">{user.email}</span>
                    </div>
                    <div className="userDetailPasswordContainer">
                        {
                            editPassword
                            ?
                            ''
                            :
                            ''
                        }
                    </div>
                    <div className="userDetailLogoutContainer">
                        {
                            logout
                            ?
                            ''
                            :
                            ''
                        }
                    </div>
                    <div className="userDetailDeleteContainer">
                        {
                            deleteAccount
                            ?
                            ''
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default UserDetail;