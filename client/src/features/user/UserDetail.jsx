import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleProfileDetailWindow, setStatusMessage } from '../general/state/slice.js';
import { logoutUser, editUserInfo, editUserPassword, deleteUser, resetEditInfoStatus, resetEditPasswordStatus } from './state/slice.js';
import crossIcon from '../../assets/img/icon-cross.svg';
import './userDetail.css';

const UserDetail = () => {
    // global variables and states
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const editInfoStatus = useSelector(state => state.user.editInfoStatus);
    const editPasswordStatus = useSelector(state => state.user.editPasswordStatus);
    const nightMode = useSelector(state => state.general.nightMode);

    const [editInfo, setEditInfo] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [logout, setLogout] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef()    
    const oldPasswordRef = useRef()    
    const newPasswordRef = useRef()    
    const newPasswordCheckRef = useRef()    


    // click and doubleclick event handlers
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

    const checkPasswordMatch = () => {
        if (newPasswordRef.current.value === '') return;
        if (newPasswordRef.current.value === newPasswordCheckRef.current.value) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handleEditPassword = () => {
        if (oldPasswordRef.current.value === '' || newPasswordRef.current.value === '' || newPasswordCheckRef.current.value === '') return;
        if (newPasswordRef.current.value !== newPasswordCheckRef.current.value) return;
        dispatch(editUserPassword({
            email: user.email,
            oldPassword: oldPasswordRef.current.value,
            newPassword: newPasswordRef.current.value,
        }));
        setEditPassword(false);
    };

    const handleLogoutClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(true);
        setDeleteAccount(false);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setLogout(false);
        navigate('/');
    };

    const handleDeleteClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(false);
        setDeleteAccount(true);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteUser({email: user.email}));
        dispatch(toggleProfileDetailWindow());
        setTimeout(() => {
            dispatch(logoutUser());
            navigate('/');
        }, 4000);
    };

    const handleCancelClick = () => {
        setEditInfo(false);
        setEditPassword(false);
        setLogout(false);
        setDeleteAccount(false);
    };

    // status messages for updateInfo and updatePassword
    useEffect(()=> {
        if (editInfoStatus === 'success') {
            dispatch(setStatusMessage({ text: "User information successfully updated.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetEditInfoStatus());
        } else if (editInfoStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to update user information. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetEditInfoStatus());
        }
    }, [editInfoStatus]);

    useEffect(()=> {
        if (editPasswordStatus === 'success') {
            dispatch(setStatusMessage({ text: "Password successfully updated.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetEditPasswordStatus());
        } else if (editPasswordStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to update password. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetEditPasswordStatus());
        }
    }, [editPasswordStatus]);

    return (
        <>
            <div className="userDetailOuterContainer">
                <div className={nightMode ? "userDetailMainContainer nightMode" : "userDetailMainCotainer"}>
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
                            <div className="userDetailActiveContainer">
                                <input type="password" ref={oldPasswordRef} />
                                <input type="password" ref={newPasswordRef} />
                                <input type="password" ref={newPasswordCheckRef} />
                                <span className="userDetailPasswordCheckMessage">
                                    {
                                        passwordMatch
                                        ?
                                        "Passwords match."
                                        :
                                        "Passwords don't match"
                                    }
                                </span>
                                <button className="userDetailControlButton" onClick={handleEditPassword}>OK</button>
                                <button className="userDetailControlButton" onClick={handleCancelClick}>cancel</button>
                            </div>
                            :
                            <button className="userDetailChangePassword" onClick={handleEditPasswordClick}>Change Password</button>
                        }
                    </div>
                    <div className="userDetailLogoutContainer">
                        {
                            logout
                            ?
                            <div className="userDetailActiveContainer">
                                <span className="userDetailConfirmQuestion">
                                    Are you sure you want to log out?
                                </span>
                                <button className="userDetailControlButton" onClick={handleLogout}>Yes</button>
                                <button className="userDetailControlButton" onClick={handleCancelClick}>No</button>
                            </div>
                            :
                            <button className="logoutButton" onClick={handleLogoutClick}>Logout</button>
                        }
                    </div>
                    <div className="userDetailDeleteContainer">
                        {
                            deleteAccount
                            ?
                            <div className="userDetailActiveContainer">
                                <span className="userDetailConfirmQuestion">
                                    Are you sure you want to delete your account? This action is irreversible.
                                </span>
                                <button className="userDetailControlButton" onClick={handleDeleteAccount}>Yes</button>
                                <button className="userDetailControlButton" onClick={handleCancelClick}>No</button>
                            </div>
                            :
                            <button className="deleteButton" onClick={handleDeleteClick}>Delete Account</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default UserDetail;
