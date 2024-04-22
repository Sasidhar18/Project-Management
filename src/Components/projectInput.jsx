import React, { useRef } from "react";
import Input from "./Input";

const ProjectInput = ({ getProject, onCancelProject }) => {
  const projectName = useRef();
  const description = useRef();
  const endDate = useRef();

  const handleProject = () => {
    const ProjectDetails = {
      title: projectName.current.value,
      description: description.current.value,
      date: endDate.current.value,
      id: Math.round(Math.random() * 100),
    };

    if (
      ProjectDetails.title.length === 0 ||
      ProjectDetails.description.length === 0 ||
      ProjectDetails.date.length === 0
    ) {
      return;
    }

    getProject(ProjectDetails);
  };

  return (
    <section className="project-details">
      <h2>Add project details</h2>
      <Input type="text" ref={projectName} label="Project name" />
      <Input ref={description} label="Project description" textarea />
      <Input type="date" ref={endDate} label="End Date" />
      <div className="button-container">
        <button className="cancel-btn" onClick={onCancelProject}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleProject}>
          Save
        </button>
      </div>
    </section>
  );
};

export default ProjectInput;
