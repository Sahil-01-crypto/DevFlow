import { useState } from "react";

import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Projects = ({
  projects,
  setProjects,
  activities,
  setActivities,
  projectTasks,
  setProjectTasks,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setstatus] = useState("all");

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

  setProjectTasks(
    projectTasks.filter((task) => task.projectId !== id)
  );

  setProjects(
    projects.filter((project) => project.id !== id)
  );

};

  const handleCreateProject = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title: projectName,
      description: description,
      progress: 0,
      tasks: 0,
      status: "Not Started",
    };

    setProjects([...projects, newProject]);

    setActivities((prev) =>
      [
        {
          title: `New project  ${projectName} created`,
          time: "Just now",
        },
        ...prev,
      ].slice(0, 4),
    );

    setProjectName("");
    setDescription("");
    setShowModal(false);
  };

  const searchResult = projects.filter((project) => {
    return project.title.toLowerCase().includes(search.toLowerCase());
  });

  const statusResult = searchResult.filter((project) => {
    if (status == "all") return true;
    return project.status === status;
  });

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

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search your projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                  w-full
                  h-12
                  pl-4 pr-4
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  transition-all
                  focus:border-violet-400/50
                  focus:bg-white/[0.07]
                  focus:ring-2
                  focus:ring-violet-500/10
                "
                />
              </div>

              {/* Status Filter */}
              <select
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                className="
                h-12
                px-4
                rounded-2xl
                bg-slate-900
                border border-white/10
                text-slate-300
                outline-none
                cursor-pointer
                transition-all
                hover:border-violet-400/30
                focus:border-violet-400/50
                focus:ring-2
                focus:ring-violet-500/10
              "
              >
                <option value="all">All Projects</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
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
                cursor-pointer

              "
            >
              + New Project
            </button>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {statusResult.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div
                  className="
                  flex h-16 w-16 items-center justify-center
                  rounded-2xl
                  bg-violet-500/10
                  border border-violet-400/20
                  text-violet-400
                  text-2xl
                  shadow-lg shadow-violet-500/10
                  mb-5
                "
                >
                  🔍
                </div>

                <h3 className="text-xl font-semibold text-white">
                  No Project Found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching with a different project name.
                </p>
              </div>
            ) : (
              statusResult.map((project) => {
                const projectTask = projectTasks.filter((task) => {
                  return task.projectId === project.id;
                });

                const totalTask = projectTask.length;

                const completedTask = projectTask.filter((task) => {
                  return task.status === "Completed";
                }).length;

                const inProgress = projectTask.filter((task) => {
                  return task.status === "In Progress";
                }).length;

                let statusChecker = "Not Started";

                if (totalTask > 0 && completedTask === totalTask) {
                  statusChecker = "Completed";
                } else if (completedTask > 0 || inProgress > 0) {
                  statusChecker = "In Progress";
                }

                return (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    progress={
                      totalTask === 0
                        ? 0
                        : Math.round((completedTask / totalTask) * 100)
                    }
                    tasks={totalTask}
                    status={statusChecker}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                );
              })
            )}
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
                  cursor-pointer

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
                  cursor-pointer

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
