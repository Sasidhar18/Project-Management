import React, { useContext, useEffect } from "react";
import SideBar from "./Components/SideBar";
import "./App.css";
import ProjectInput from "./Components/projectInput";
import FallbackProject from "./Components/FallbackProject";
import ProjectView from "./Components/ProjectView";
import { ProjectContext } from "./Store/project-context-provider.jsx";

const App = () => {
  const { projectStatus } = useContext(ProjectContext);

  let content;

  if (projectStatus === undefined) {
    content = <ProjectInput />;
  } else if (projectStatus === null) {
    content = <FallbackProject />;
  } else if (projectStatus) {
    content = <ProjectView />;
  }

  return (
    <main>
      <SideBar />
      {content}
    </main>
  );
};

export default App;
