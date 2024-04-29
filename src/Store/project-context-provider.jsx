import { createContext, useReducer, useEffect } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import db from "../Components/firebase.js";

export const ProjectContext = createContext({
  projectStatus: null,
  projects: [],
  task: [],
  getProjectDetailsFromAPI: () => {},
  addProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
  completeTask: () => {},
  getNewProject: () => {},
  closeProject: () => {},
  viewProjectDetails: () => {},
});

const projectDetailsReducer = (state, action) => {
  if (action.type === "GET_PROJECTS_FROM_API") {
    return {
      ...state,
      projects: action.payload.projects,
      task: action.payload.task,
    };
  }
  if (action.type === "SHOW_PROJECT_INPUTS") {
    return {
      ...state,
      projectStatus: undefined,
    };
  }

  if (action.type === "BACK_TO_HOMEPAGE") {
    return {
      ...state,
      projectStatus: null,
    };
  }

  if (action.type === "ADD_PROJECT") {
    return {
      ...state,
      projectStatus: null,
      projects: [
        ...state.projects,
        {
          title: action.payload.title,
          description: action.payload.description,
          date: action.payload.date,
          id: action.payload.id,
        },
      ],
    };
  }

  if (action.type === "DELETE_PROJECT") {
    return {
      ...state,
      projectStatus: null,
      projects: state.projects.filter(
        (project) => action.payload !== project.id
      ),
    };
  }

  if (action.type === "VIEW_PROJECT_DETAILS") {
    return {
      ...state,
      projectStatus: action.payload,
    };
  }

  if (action.type === "ADD_TASK") {
    return {
      ...state,
      task: [
        ...state.task,
        {
          title: action.payload.title,
          projectId: action.payload.projectId,
          completed: action.payload.completed,
          id: action.payload.id,
        },
      ],
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      task: state.task.filter((task) => action.payload !== task.id),
    };
  }

  if (action.type === "COMPLETE_TASK") {
    return {
      ...state,
      task: state.task.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else {
          return item;
        }
      }),
    };
  }
  return state;
};
const ProjectContextProvider = ({ children }) => {
  const [projectState, projectDispatch] = useReducer(projectDetailsReducer, {
    projectStatus: null,
    projects: [],
    task: [],
  });

  const data = collection(db, "project");
  const data2 = collection(db, "task");

  useEffect(() => {
    const getProjectDataFromFirebase = async () => {
      const getData = await getDocs(data);
      const getData2 = await getDocs(data2);
      const formattedProject = getData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const formattedTask = getData2.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const projectDetails = {
        projects: formattedProject,
        task: formattedTask,
      };
      projectDispatch({
        type: "GET_PROJECTS_FROM_API",
        payload: projectDetails,
      });
    };

    getProjectDataFromFirebase();
  }, []);

  const changeState = () => {
    projectDispatch({
      type: "SHOW_PROJECT_INPUTS",
    });
  };

  const backtoHomepage = () => {
    projectDispatch({
      type: "BACK_TO_HOMEPAGE",
    });
  };

  const addProject = async (project) => {
    const { id } = await addDoc(data, project);
    const newProject = {
      ...project,
      id: id,
    };

    projectDispatch({
      type: "ADD_PROJECT",
      payload: newProject,
    });
  };

  const deleteProject = async (projectId) => {
    await deleteDoc(doc(db, "project", projectId));
    projectDispatch({
      type: "DELETE_PROJECT",
      payload: projectId,
    });
  };

  const viewProjectDetails = (projectId) => {
    projectDispatch({
      type: "VIEW_PROJECT_DETAILS",
      payload: projectId,
    });
  };

  const addTask = async (task) => {
    const { id } = await addDoc(data2, task);
    const newTask = {
      ...task,
      id: id,
    };

    projectDispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "task", taskId));
    projectDispatch({
      type: "DELETE_TASK",
      payload: taskId,
    });
  };

  const completeTask = async (task) => {
    await setDoc(doc(db, "task", task.id), {
      title: task.title,
      projectId: task.projectId,
      completed: !task.completed,
      id: task.id,
    });
    projectDispatch({
      type: "COMPLETE_TASK",
      payload: task,
    });
  };

  const ctxValue = {
    projectStatus: projectState.projectStatus,
    projects: projectState.projects,
    task: projectState.task,
    addProject: addProject,
    deleteProject: deleteProject,
    addTask: addTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    getNewProject: changeState,
    closeProject: backtoHomepage,
    viewProjectDetails: viewProjectDetails,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
