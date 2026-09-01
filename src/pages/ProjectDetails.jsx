import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

import TaskCard from "../components/TaskCard";
const ProjectDetails = ({ projects }) => {
  const params = useParams();
  const id = params.id;

  const project = projects.find((currproject) => {
    return currproject.id === Number(id);
  });
  const [projectTasks, setProjectTasks] = useState(() => {
    const savedTasks = localStorage.getItem("projectTasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      // your initial tasks
      {
        id: 1,
        projectId: 1,
        title: "Build authentication",
        description: "Implement login and registration ",
        status: "In Progress",
        priority: "High",
        dueDate: "2026-09-05",
      },
      {
        id: 2,
        projectId: 1,
        title: "Create dashboard",
        description: "Build the main dashboard UI",
        status: "Completed",
        priority: "Medium",
        dueDate: "2026-09-02",
      },
      {
        id: 3,
        projectId: 2,
        title: "Design portfolio",
        description: "Create portfolio layout",
        status: "Not Started",
        priority: "Low",
        dueDate: "2026-09-10",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("projectTasks", JSON.stringify(projectTasks));

    console.log(
      "Saved tasks:",
      JSON.parse(localStorage.getItem("projectTasks")),
    );
  }, [projectTasks]);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const filteredTask = projectTasks.filter((tasksss) => {
    return tasksss.projectId === Number(id);
  });

  const handleCreateTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      projectId: Number(id),
      title: taskTitle,
      description: taskDescription,
      status: status,
      priority: priority,
      dueDate: dueDate,
    };

    setProjectTasks((prevTasks) => [...prevTasks, newTask]);
    localStorage.setItem(
      "projectTasks",
      JSON.stringify([...projectTasks, newTask]),
    );
    setTaskTitle("");
    setTaskDescription("");
    setStatus("");
    setPriority("");
    setDueDate("");
    setShowAddTaskModel(false);
  };

  // edit statesss

  const [taskEditModal, settaskEditModal] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");
  const [editedTaskStatus, setEditedTaskStatus] = useState("Not Started");
  const [editedTaskPriority, setEditedTaskPriority] = useState("Medium");
  const [editedTaskDueDate, setEditedTaskDueDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

const handleTaskEdit = (taskId) => {
  const task = projectTasks.find((task) => task.id === taskId);

  if (!task) return;

  setEditingTaskId(taskId);
  setEditedTaskTitle(task.title);
  setEditedTaskDescription(task.description);
  setEditedTaskStatus(task.status);
  setEditedTaskPriority(task.priority);
  setEditedTaskDueDate(task.dueDate);

  settaskEditModal(true);
};
const handleEditTask = (e) => {
  e.preventDefault();

  setProjectTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: editedTaskTitle,
            description: editedTaskDescription,
            status: editedTaskStatus,
            priority: editedTaskPriority,
            dueDate: editedTaskDueDate,
          }
        : task
    )
  );

  settaskEditModal(false);
  setEditingTaskId(null);
};
  return (
    <div>
      return (
      <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-8">
            {/* Back */}
            <button
              onClick={() => window.history.back()}
              className="
            mb-8
            flex items-center gap-2
            text-sm text-slate-400
            hover:text-white
            transition
            cursor-pointer
          "
            >
              ← Back to Projects
            </button>

            {/* Project Header */}
            <div
              className="
            rounded-3xl
            p-8
            bg-gradient-to-br
            from-white/10
            via-slate-900/80
            to-violet-900/50
            backdrop-blur-xl
            border border-white/10
            shadow-2xl
          "
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="
                    px-3 py-1
                    rounded-full
                    bg-violet-500/10
                    border border-violet-400/20
                    text-violet-400
                    text-xs font-medium
                  "
                    >
                      {project.status}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight">
                    {project.title}
                  </h1>

                  <p className="mt-3 text-slate-400 max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {/* Project Progress */}
                <div className="w-full lg:w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-400">Progress</span>

                    <span className="text-sm font-semibold text-white">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="
                    h-full
                    rounded-full
                    bg-violet-500
                    transition-all
                  "
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
              {/* Tasks */}
              <div
                className="
              rounded-2xl
              p-5
              bg-white/5
              border border-white/10
              backdrop-blur-xl
            "
              >
                <p className="text-sm text-slate-500">Total Tasks</p>

                <p className="mt-2 text-3xl font-bold">{project.tasks}</p>
              </div>

              {/* Progress */}
              <div
                className="
              rounded-2xl
              p-5
              bg-white/5
              border border-white/10
              backdrop-blur-xl
            "
              >
                <p className="text-sm text-slate-500">Progress</p>

                <p className="mt-2 text-3xl font-bold">{project.progress}%</p>
              </div>

              {/* Status */}
              <div
                className="
              rounded-2xl
              p-5
              bg-white/5
              border border-white/10
              backdrop-blur-xl
            "
              >
                <p className="text-sm text-slate-500">Status</p>

                <p className="mt-2 text-xl font-semibold">{project.status}</p>
              </div>
            </div>

            {/* Tasks Section */}
            <div
              className="
            mt-8
            rounded-3xl
            p-6
            bg-white/5
            border border-white/10
            backdrop-blur-xl
          "
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Tasks</h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Tasks associated with this project
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowAddTaskModel(true);
                  }}
                  className="
                px-4 py-2
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                transition
                font-medium
                cursor-pointer
              "
                >
                  + Add Task
                </button>
              </div>

              {filteredTask.length === 0 ? (
                <div
                  className="
              flex flex-col
              items-center
              justify-center
              py-16
              rounded-2xl
              border border-dashed border-white/10
              bg-black/10
            "
                >
                  <div
                    className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-violet-500/10
                border border-violet-400/20
                text-violet-400
                text-xl
                mb-4
              "
                  >
                    ✓
                  </div>

                  <h3 className="font-medium">No tasks yet</h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Add your first task to start working on this project.
                  </p>
                </div>
              ) : (
                <>
                  {filteredTask.map((obj) => (
                    <TaskCard
                      key={obj.id}
                      id={obj.id}
                      projectId={obj.projectId}
                      title={obj.title}
                      description={obj.description}
                      status={obj.status}
                      priority={obj.priority}
                      dueDate={obj.dueDate}
                      onEdit={handleTaskEdit}
                    />
                  ))}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      <div>
        {showAddTaskModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <form
              onSubmit={handleCreateTask}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Create New Task
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a task to this project
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Build authentication"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  placeholder="Describe what needs to be done..."
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="3"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50"
                  required
                />
              </div>

              {/* Status + Priority */}
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/50"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/50"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-violet-400/50"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModel(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      );







      {/* adding edit modal */}






      {taskEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#151515] p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Edit Task</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Update your task details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setTaskEditModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditTask} className="space-y-5">
              {/* Task Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Task Title
                </label>

                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-indigo-500 focus:bg-white/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={editedTaskDescription}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                  placeholder="Describe your task"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-indigo-500 focus:bg-white/10"
                />
              </div>

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Status
                  </label>

                  <select
                    value={editedTaskStatus}
                    onChange={(e) => setEditedTaskStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Priority
                  </label>

                  <select
                    value={editedTaskPriority}
                    onChange={(e) => setEditedTaskPriority(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Due Date
                </label>

                <input
                  type="date"
                  value={editedTaskDueDate}
                  onChange={(e) => setEditedTaskDueDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => settaskEditModal(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
