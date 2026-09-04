import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";

import { useState, useEffect } from "react";

const App = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "DevFlow",
      description: "Developer productivity platform",
      progress: 80,
      tasks: 12,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal developer portfolio",
      progress: 60,
      tasks: 18,
      status: "Completed",
    },
    {
      id: 3,
      title: "E-Commerce",
      description: "Modern shopping platform",
      progress: 35,
      tasks: 24,
      status: "Not Started",
    },
    {
      id: 4,
      title: "DevFlow",
      description: "Developer productivity platform",
      progress: 80,
      tasks: 12,
      status: "On Hold",
    },
    {
      id: 5,
      title: "Portfolio",
      description: "Personal developer portfolio",
      progress: 60,
      tasks: 18,
      status: "In Progress",
    },
    {
      id: 6,
      title: "E-Commerce",
      description: "Modern shopping platform",
      progress: 35,
      tasks: 24,
      status: "Completed",
    },
  ]);

  const [activities, setActivities] = useState([]);

  const [projectTasks, setProjectTasks] = useState(() => {
    const savedTasks = localStorage.getItem("projectTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });
  

  
  useEffect(() => {
    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
  }, [projectTasks]);

  return (
    <div className=" w-full h-screen bg-gray-950 scroll-smooth">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              projects={projects}
              projectTasks={projectTasks}
              activities={activities}
            />
          }
        />
        <Route path="/kanban" element={<Kanban />} />
        <Route
          path="/projects"
          element={<Projects projects={projects} setProjects={setProjects} />}
        />

        <Route
          path="/projects/:id"
          element={
            <ProjectDetails
              projects={projects}
              projectTasks={projectTasks}
              setProjectTasks={setProjectTasks}
              activities={activities}
              setActivities={setActivities}
            />
          }
        />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
