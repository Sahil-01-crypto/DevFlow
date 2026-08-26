import { useState } from "react";

import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "DevFlow",
      description: "Developer productivity platform",
      progress: 80,
      tasks: 12,
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal developer portfolio",
      progress: 60,
      tasks: 18,
    },
    {
      id: 3,
      title: "E-Commerce",
      description: "Modern shopping platform",
      progress: 35,
      tasks: 24,
    },
    {
      id: 1,
      title: "DevFlow",
      description: "Developer productivity platform",
      progress: 80,
      tasks: 12,
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal developer portfolio",
      progress: 60,
      tasks: 18,
    },
    {
      id: 3,
      title: "E-Commerce",
      description: "Modern shopping platform",
      progress: 35,
      tasks: 24,
    },
  ]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = ({ title, description, id }) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              title: title,
              description: description,
            }
          : project,
      ),
    );
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title: projectName,
      description: description,
      progress: 0,
      tasks: 0,
    };

    setProjects([...projects, newProject]);

    setProjectName("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Projects</h1>

              <p className="text-slate-500 mt-1">
                Manage and track your projects
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="
                px-5 py-3
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                transition
                font-medium
                shadow-lg shadow-violet-500/20
              "
            >
              + New Project
            </button>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                progress={project.progress}
                tasks={project.tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleCreateProject}
            className="
              w-full max-w-md
              rounded-3xl
              p-6
              bg-gradient-to-br
              from-white/10
              via-slate-900/90
              to-violet-900/70
              backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
          >
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>

            {/* Project Name */}
            <div className="mb-5">
              <label className="block text-sm text-slate-300 mb-2">
                Project Name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                required
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  outline-none
                  focus:border-violet-400
                  transition
                "
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-slate-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project"
                rows="4"
                required
                className="
                  w-full
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  outline-none
                  focus:border-violet-400
                  transition
                  resize-none
                "
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  px-5 py-2
                  rounded-xl
                  bg-violet-600
                  hover:bg-violet-500
                  transition
                "
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;
