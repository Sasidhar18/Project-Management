import React from "react";
import Tasks from "./Tasks";

const ProjectDetails = ({ project, onDeleteProject, task, saveTask, onDeleteTask }) => {
  const projectDate = new Date(project.date).toLocaleString("en-in", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="project-view-details">
      <div className="project-title">
        <h2>{project.title}</h2>
        <button onClick={() => onDeleteProject(project.id)}>X</button>
      </div>
      <p>{project.description}</p>
      <p>{projectDate}</p>
      <Tasks projectId={project.id} saveTask={saveTask} task={task} onDeleteTask={onDeleteTask}/>
    </div>
  );
};

export default ProjectDetails;
