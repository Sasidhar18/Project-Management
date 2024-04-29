import React, { useContext } from "react";
import { ProjectContext } from "../Store/project-context-provider.jsx";

const SideBar = () => {
  const { projects, getNewProject, viewProjectDetails} = useContext(ProjectContext);
  return (
    <aside className="side-bar">
      <h2>Your Projects</h2>
      <p>
        <button className="addProject" onClick={getNewProject}>
          Add new projects
        </button>
      </p>
      {projects.map((item) => (
        <ul key={item.id}>
          <li>
            <button
              onClick={() => viewProjectDetails(item.id)}
              className="project-btn"
            >
              {item.title}
            </button>
          </li>
        </ul>
      ))}
    </aside>
  );
};

export default SideBar;
