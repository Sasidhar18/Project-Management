import React, { useContext } from "react";
import Tasks from "./Tasks";
import { ProjectContext } from "../Store/project-context-provider";

const ProjectDetails = () => {
  const { projects, projectStatus, deleteProject } = useContext(ProjectContext);

  const selectedProject = projects.find(
    (project) => project.id === projectStatus
  );
  const projectDate = new Date(selectedProject.date).toLocaleString("en-in", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="project-view-details">
      <div className="project-title">
        <h2>{selectedProject.title}</h2>
        <button onClick={() => deleteProject(selectedProject.id)}>X</button>
      </div>
      <p>{selectedProject.description}</p>
      <p>{projectDate}</p>
      <Tasks projectId={selectedProject.id} />
    </div>
  );
};

export default ProjectDetails;
