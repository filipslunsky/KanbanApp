import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, resetAddCategoryStatus } from "./state/slice";
import { setStatusMessage } from "../general/state/slice";
import './newCategory.css';

const NewCategory = () => {
    // global variables
    const dispatch = useDispatch();

    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const addCategoryStatus = useSelector(state => state.categories.addCategoryStatus);
    const nightMode = useSelector(state => state.general.nightMode);

    const newCategoryNameRef = useRef();

    const [newCategoryClicked, setNewCategoryClicked] = useState(false);

    // add new category handlers
    const handleAddNewClick = () => {
        setNewCategoryClicked(true);
    };

    const handleAddNewClickCancel = () => {
        setNewCategoryClicked(false);
    };

    const handleAddNewClickOk = () => {
        if (currentProjectId === null) return;
        dispatch(addCategory({
            projectId: currentProjectId,
            categoryName: newCategoryNameRef.current.value,
        }));
        setNewCategoryClicked(false);
    };

    // status message for addCategory
    useEffect(()=> {
        if (addCategoryStatus === 'success') {
            dispatch(setStatusMessage({ text: "New project board created.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetAddCategoryStatus());
        } else if (addCategoryStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to create new project board. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetAddCategoryStatus());
        }
    }, [addCategoryStatus]);

    return (
        <>
            <div className={nightMode ? "newCategoryMainCotnainer nightMode" : "newCategoryMainCotnainer"}>
                {
                    newCategoryClicked
                    ?
                    <div className="newCategoryActiveContainer">
                        <input
                        type="text"
                        ref={newCategoryNameRef}
                        className="newCategoryNameInput"
                        />
                        <button className="newCategoryConfirmButton" onClick={handleAddNewClickOk}>Save</button>
                        <button className="newCategoryCancelButton" onClick={handleAddNewClickCancel}>Cancel</button>
                    </div>
                    :
                    <button className="newCategoryAddButton" onClick={handleAddNewClick}>+ New Column</button>
                }
            </div>
        </>
    );
}
 
export default NewCategory;