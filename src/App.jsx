import React, { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import "./App.css";
import ProjectInput from "./Components/projectInput";
import FallbackProject from "./Components/FallbackProject";
import ProjectView from "./Components/ProjectView";
import db from "./Components/firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const App = () => {
  const [ProjectDetails, setProjectDetails] = useState({
    projectStatus: null,
    projects: [],
    task: [],
  });

  let content;

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
      setProjectDetails((prevState) => {
        return {
          ...prevState,
          projects: formattedProject,
          task: formattedTask,
        };
      });
    };

    getProjectDataFromFirebase();
  }, []);

  const handleProjects = async (newProject) => {
    const {id} = await addDoc(data, newProject);
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: null,
        projects: [...prevState.projects, {
          title: newProject.title,
          description: newProject.description,
          date: newProject.date,
          id,
        }],
      };
    });
  };

  const addProject = () => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: undefined,
      };
    });
  };

  const cancelProject = () => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: null,
      };
    });
  };

  const viewProjectDetails = (projectId) => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: projectId,
      };
    });
  };

  const deleteProject = async (projectId) => {
    await deleteDoc(doc(db, "project", projectId));
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: null,
        projects: prevState.projects.filter(
          (project) => projectId !== project.id
        ),
      };
    });
  };

  const saveTaskDetails = async (task) => {
    const { id } = await addDoc(data2, task);
    console.log(id);
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        task: [
          ...prevState.task,
          {
            title: task.title,
            projectId: task.projectId,
            id: id,
          },
        ],
      };
    });
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "task", taskId));
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        task: prevState.task.filter((task) => taskId !== task.id),
      };
    });
  };

  const selectedProject = ProjectDetails.projects.find(
    (project) => project.id === ProjectDetails.projectStatus
  );

  const currentTask = ProjectDetails.task.filter(
    (task) => task.projectId === ProjectDetails.projectStatus
  );

  if (ProjectDetails.projectStatus === undefined) {
    content = (
      <ProjectInput
        getProject={handleProjects}
        onCancelProject={cancelProject}
      />
    );
  } else if (ProjectDetails.projectStatus === null) {
    content = <FallbackProject onAddProject={addProject} />;
  } else if (ProjectDetails.projectStatus) {
    content = (
      <ProjectView
        saveTask={saveTaskDetails}
        task={currentTask}
        onDeleteTask={deleteTask}
        onDeleteProject={deleteProject}
        project={selectedProject}
      />
    );
  }

  return (
    <main>
      <SideBar
        onAddProject={addProject}
        projects={ProjectDetails}
        getProjectDetails={viewProjectDetails}
      />
      {content}
    </main>
  );
};

export default App;
