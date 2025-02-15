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

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch, updateProjectStatus, deleteProjectStatus, addProjectStatus]);

    useEffect(() => {
        console.log(projects);
        if (projects.length > 0) {
            console.log(projects[0].project_id);
            dispatch(setCurrentProjectId(projects[0].project_id));
        };
    }, [projectsStatus]);

    const handleSelectProject = (projectId) => {
        dispatch(setCurrentProjectId(projectId));
    };

    const handleEditProject = (projectId) => {
        setEditProject(projectId);
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
        dispatch(resetUpdateProjectStatus());
    };

    const handleDeleteProject = (projectId) => {
        setRemoveProject(projectId);
    };

    const handleCancelDeleteProject = () => {
        setRemoveProject(0);
    };

    const handleOkDeleteProject = (projectId) => {
        dispatch(deleteProject({projectId}));
        setRemoveProject(0);
        dispatch(resetDeleteProjectStatus());
    };

    const handleCreateProject = () => {
        setCreateProject(true);
    };

    const handleOkCreateProject = () => {
        dispatch(addProject({projectName: newProjectNameRef.current.value}));
        setCreateProject(false);
        dispatch(resetAddProjectStatus());
    };

    const handleCancelCreateProject = () => {
        setCreateProject(false);
    };

    if (projectsStatus === 'loading') return (<div className="projectsMainContainer"><span className="projectsLoadingMessage">Loading...</span></div>);

    if (projectsStatus === 'failed') return (<div className="projectsMainContainer"><span className="projectsLoadingMessage">Failed to load projects. Please refresh the page or try again later.</span></div>);

    return (
        <>
            <div className="projectsMainContainer">
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
                                                        <span className="projectsActiveItemQuestion">Delete forever?</span>
                                                        <button className="projectActiveItemCancelButton" onClick={handleCancelDeleteProject}>no</button>
                                                        <button className="projectActiveItemConfirmButton" onClick={() => {handleOkDeleteProject(item.project_id)}}>yes</button>
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