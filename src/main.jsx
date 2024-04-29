import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProjectContextProvider from "./Store/project-context-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectContextProvider>
    <App />
  </ProjectContextProvider>
);
