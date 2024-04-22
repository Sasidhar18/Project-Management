import React from "react";

const FallbackProject = ({ onAddProject }) => {
  return (
    <div className="no-projects">
      <img src="/noproject.jpg" alt="No project found" />
      <h2>No Project Available</h2>
      <p>Please create a new project.</p>
      <button onClick={onAddProject} className="addProject">
        Add new project
      </button>
    </div>
  );
};

export default FallbackProject;
