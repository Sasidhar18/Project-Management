import React, { useRef, useContext } from "react";
import Input from "./Input";
import { ProjectContext } from "../Store/project-context-provider";

const ProjectInput = () => {
  const projectName = useRef();
  const description = useRef();
  const endDate = useRef();
  const { addProject, closeProject } = useContext(ProjectContext);

  const addNewProject = () => {
    const ProjectDetails = {
      title: projectName.current.value,
      description: description.current.value,
      date: endDate.current.value,
      id: Math.round(Math.random() * 100).toString(),
    };

    if (
      ProjectDetails.title.length === 0 ||
      ProjectDetails.description.length === 0 ||
      ProjectDetails.date.length === 0
    ) {
      return;
    }

    addProject(ProjectDetails);
  };

  return (
    <section className="project-details">
      <h2>Add project details</h2>
      <Input type="text" ref={projectName} label="Project name" />
      <Input ref={description} label="Project description" textarea />
      <Input type="date" ref={endDate} label="End Date" />
      <div className="button-container">
        <button className="cancel-btn" onClick={closeProject}>
          Cancel
        </button>
        <button className="save-btn" onClick={addNewProject}>
          Save
        </button>
      </div>
    </section>
  );
};

export default ProjectInput;
