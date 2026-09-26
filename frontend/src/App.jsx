import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/login";
import { useState, useEffect } from "react";

import getCurrentUser from "./services/auth.api";
import projectsApi from "./services/project.api";

import tasksApi from "./services/task.api";
const App = () => {
  const [projects, setProjects] = useState(() => {
    const savedProject = localStorage.getItem("projects");

    if (savedProject) {
      return JSON.parse(savedProject);
    }

    return [];
  });


  // BACKEND API CALL TO  VALIDATE USER 

  useEffect(()=>{
    const checkUser = async()=>{
      const user = await getCurrentUser();

      console.log("Current User:", user);

     
  }
  checkUser();
  
},[])

// BACKEND API CALL TO GET PROJECTS

useEffect(() => {
    const fetchProjects = async () => {
        const response = await projectsApi.getProjects();
        
        setProjects(response);
    };
    

    fetchProjects();
}, []);

// BACKEND API CALL TO GET TASKS

useEffect(() => {
  const fetchTask = async () => {
    const response = await tasksApi.getTasks();

    console.log("Fetched Tasks:", response);
    setProjectTasks(response);
  };

  fetchTask();
}, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("recentActivities");

    if (savedActivities) {
      return JSON.parse(savedActivities);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("recentActivities", JSON.stringify(activities));
  }, [activities]);

  const [projectTasks, setProjectTasks] = useState(() => {
    const savedTasks = localStorage.getItem("projectTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  useEffect(() => {
    console.log("Saving tasks:", projectTasks);

    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));
  }, [projectTasks]);

  return (
    <div className=" w-full h-screen bg-gray-950 scroll-smooth">
      <Routes>
        <Route path="/login" element={<Login />} />
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

        <Route
          path="/projects"
          element={
            <Projects
              projects={projects}
              setProjects={setProjects}
              activities={activities}
              setActivities={setActivities}
              projectTasks={projectTasks}
              setProjectTasks={setProjectTasks}
            />
          }
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

        <Route
          path="/kanban"
          element={
            <Kanban
            projects ={projects}
              projectTasks={projectTasks}
              setProjectTasks={setProjectTasks}
            />
          }
        />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
