import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    setStatusMessage,
    resetAddProjectStatus,
    resetUpdateProjectStatus,
    resetDeleteProjectStatus,
    setCurrentProjectId,
} from './state/slice';
import projectIcon from '../../assets/img/icon-board.svg';
import './projects.css';

const Projects = () => {
    // main variables
    const dispatch = useDispatch();

    const projects = useSelector(state => state.general.projects);
    const projectsStatus = useSelector(state => state.general.projectsStatus);
    const addProjectStatus = useSelector(state => state.general.addProjectStatus);
    const updateProjectStatus = useSelector(state => state.general.updateProjectStatus);
    const deleteProjectStatus = useSelector(state => state.general.deleteProjectStatus);
    const currentProjectId = useSelector(state => state.general.currentProjectId);
    const nightMode = useSelector(state => state.general.nightMode);

    const [editProject, setEditProject] = useState(0);
    const [removeProject, setRemoveProject] = useState(0);
    const [createProject, setCreateProject] = useState(false);

    const projectNameRef = useRef();
    const newProjectNameRef = useRef();

    // projects loading
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch, updateProjectStatus, deleteProjectStatus, addProjectStatus]);

    useEffect(() => {
        if (projects.length > 0) {
            dispatch(setCurrentProjectId(projects[0].project_id));
        };
    }, [projectsStatus]);

    // status messages for add/edit/delete
    useEffect(()=> {
        if (addProjectStatus === 'success') {
            dispatch(setStatusMessage({ text: "New project board created.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetAddProjectStatus());
        } else if (addProjectStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to create new project board. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetAddProjectStatus());
        }
    }, [addProjectStatus]);

    useEffect(()=> {
        if (updateProjectStatus === 'success') {
            dispatch(setStatusMessage({ text: "Project board name changed successfully.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetUpdateProjectStatus());
        } else if (updateProjectStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to change project board name. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetUpdateProjectStatus());
        }
    }, [updateProjectStatus]);

    useEffect(()=> {
        if (deleteProjectStatus === 'success') {
            dispatch(setStatusMessage({ text: "Project board deleted permanently.", visible: true, style: 'success' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetDeleteProjectStatus());
        } else if (deleteProjectStatus === 'failed') {
            dispatch(setStatusMessage({ text: "Failed to delete project board. Please try again.", visible: true, style: 'failed' }));
            setTimeout(() => dispatch(setStatusMessage({ text: "", visible: false, style: '' })), 3000);
            dispatch(resetDeleteProjectStatus());
        }
    }, [deleteProjectStatus]);

    // choosing current project board
    const handleSelectProject = (projectId) => {
        dispatch(setCurrentProjectId(projectId));
    };

    // editProject onClick funcs
    const handleEditProject = (projectId) => {
        setEditProject(projectId);
        setCreateProject(false);
    };

    const handleCancelEditProject = () => {
        setEditProject(0);
    };

    const handleOkEditProject = (projectId) => {
        const editItem = {
            projectName: projectNameRef.current.value,
            projectId
        };
        dispatch(updateProject(editItem));
        setEditProject(0);
    };

    // deleteProject onClick funcs
    const handleDeleteProject = (projectId) => {
        setRemoveProject(projectId);
        setCreateProject(false);
    };

    const handleCancelDeleteProject = () => {
        setRemoveProject(0);
    };

    const handleOkDeleteProject = (projectId) => {
        dispatch(deleteProject({projectId}));
        setRemoveProject(0);
    };

    // addProject onClick funcs
    const handleCreateProject = () => {
        setCreateProject(true);
        setEditProject(0);
        setRemoveProject(0);
    };

    const handleOkCreateProject = () => {
        dispatch(addProject({projectName: newProjectNameRef.current.value}));
        setCreateProject(false);
    };

    const handleCancelCreateProject = () => {
        setCreateProject(false);
    };

    // global status messages
    if (projectsStatus === 'loading') return (<div className="projectsMainContainer"><span className="projectsLoadingMessage">Loading...</span></div>);

    if (projectsStatus === 'failed') return (<div className="projectsMainContainer"><span className="projectsLoadingMessage">Failed to load projects. Please refresh the page or try again later.</span></div>);

    return (
        <>
            <div className={nightMode ? "projectsMainContainer nightMode" : "projectsMainContainer"}>
                <h2 className="projectsHeader">ALL BOARDS ({projects.length})</h2>
                <div className="projectsItemsContainer">
                    {
                        projects.map(item => {
                            return (
                                <div
                                className={currentProjectId == item.project_id ? "projectsItemContainer currentProject" : "projectsItemContainer"}
                                key={item.project_id}
                                onClick={() => {handleSelectProject(item.project_id)}}
                                >
                                    <img src={projectIcon} alt="icon" className="projectsProjectIcon" />
                                        {
                                            item.project_id == editProject
                                            ?
                                            <div className="projectsActiveItemContainer">
                                                <input
                                                type="text"
                                                className="projectsActiveItemNameInput"
                                                ref={projectNameRef}
                                                defaultValue={item.project_name}
                                                />
                                                <button className="projectsActiveItemConfirmButton" onClick={() => {handleOkEditProject(item.project_id)}}>ok</button>
                                                <button className="projectsActiveItemCancelButton" onClick={handleCancelEditProject}>cancel</button>
                                            </div>
                                            :
                                            <>
                                                <span className="projectsProjectTitle">{item.project_name}</span>
                                                <button className='projectsItemEditButton' onClick={() => {handleEditProject(item.project_id)}}>edit</button>
                                                {
                                                    item.project_id == removeProject
                                                    ?
                                                    <div className="projectsActiveItemContainer">
                                                        <span className="projectsActiveItemQuestion">Delete?</span>
                                                        <button className="projectsActiveItemCancelButton" onClick={handleCancelDeleteProject}>no</button>
                                                        <button className="projectsActiveItemConfirmButton" onClick={() => {handleOkDeleteProject(item.project_id)}}>yes</button>
                                                    </div>
                                                    :
                                                    <button className="projectsItemDeleteButton" onClick={() => {handleDeleteProject(item.project_id)}}>delete</button>
                                                }
                                            </>
                                        }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="projectsAddProjectContainer">
                    <img src={projectIcon} alt="icon" className="projectsProjectIcon" />
                    {
                        createProject
                        ?
                        <div className="projectsActiveItemContainer">
                            <input
                            type="text"
                            className="projectsActiveItemNameInput"
                            ref={newProjectNameRef}
                            />
                            <button className="projectsActiveItemConfirmButton" onClick={handleOkCreateProject}>ok</button>
                            <button className="projectsActiveItemCancelButton" onClick={handleCancelCreateProject}>cancel</button>
                        </div>
                        :
                        <button className="projectsCreateNewButton" onClick={handleCreateProject}> + Create New Board</button>
                    }
                </div>
            </div>
        </>
    );
}
 
export default Projects;