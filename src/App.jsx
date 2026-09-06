import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";

import { useState, useEffect } from "react";

const App = () => {
  const [projects, setProjects] = useState(()=>{
    const savedProject = localStorage.getItem("projects")

    if(savedProject){
      return JSON.parse(savedProject)
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("projects" ,JSON.stringify(projects))
  }, [projects])
  

  const [activities, setActivities] = useState(()=>{
    const savedActivities = localStorage.getItem("recentActivities");

    if(savedActivities){
      return JSON . parse(savedActivities);
    }
    return [];
  }
    
  );

  useEffect(() => {
    localStorage.setItem("recentActivities" , JSON.stringify(activities));
  
    
  }, [activities])
  

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
          element={<Projects projects={projects} 
          setProjects={setProjects} 
          activities={activities} 
          setActivities={setActivities} 
          projectTasks ={projectTasks}
          setProjectTasks ={setProjectTasks} />}
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
