import React from "react";

const SideBar = ({ projects, getProjectDetails, onAddProject }) => {
  return (
    <aside className="side-bar">
      <h2>Your Projects</h2>
      <p>
        <button className="addProject" onClick={onAddProject}>
          Add new projects
        </button>
      </p>
      {projects.projects.map((item) => (
        <ul key={item.id}>
          <button
            onClick={() => getProjectDetails(item.id)}
            className="project-btn"
          >
            {item.title}
          </button>
        </ul>
      ))}
    </aside>
  );
};

export default SideBar;
