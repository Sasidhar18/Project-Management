import React, { useRef, useState } from "react";
import SideBar from "./Components/SideBar";
import "./App.css";
import ProjectInput from "./Components/projectInput";
import FallbackProject from "./Components/FallbackProject";
import ProjectView from "./Components/ProjectView";

const App = () => {
  const [ProjectDetails, setProjectDetails] = useState({
    projectStatus: null,
    projects: [],
    task: [],
  });

  let content;

  const handleProjects = (newProject) => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        projectStatus: null,
        projects: [...prevState.projects, newProject],
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

  const deleteProject = (projectId) => {
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

  const saveTaskDetails = (task) => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        task: [...prevState.task, task],
      };
    });
  };

  const deleteTask = (taskId) => {
    setProjectDetails((prevState) => {
      return {
        ...prevState,
        task: prevState.task.filter(
          (task) => taskId !== task.id
        ),
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
