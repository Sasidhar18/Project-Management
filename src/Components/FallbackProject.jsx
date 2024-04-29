import React, { useContext } from "react";
import { ProjectContext } from "../Store/project-context-provider";

const FallbackProject = () => {
  const { getNewProject } = useContext(ProjectContext);
  return (
    <div className="no-projects">
      <img src="/noproject.jpg" alt="No project found" />
      <h2>No Project Available</h2>
      <p>Please create a new project.</p>
      <button onClick={getNewProject} className="addProject">
        Add new project
      </button>
    </div>
  );
};

export default FallbackProject;
