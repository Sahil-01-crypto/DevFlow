import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

import TaskCard from "../components/TaskCard";
const ProjectDetails = ({
  projects,
  projectTasks,
  setProjectTasks,
  activities,
  setActivities,
}) => {
  const params = useParams();
  const id = params.id;

  const project = projects.find((currproject) => {
    return currproject.id === Number(id);
  });

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

    setActivities((prev) => [
      {
        title: `New task ${taskTitle} created`,
        time: "Just now",
      },
      ...prev,
    ]);

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
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  // /delete task model state
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const handleTaskEdit = (taskId) => {
    const task = projectTasks.find((task) => {
      return task.id === taskId;
    });

    if (!task) return;

    setEditingTaskId(taskId);
    setEditedTaskTitle(task.title);
    setEditedTaskDescription(task.description);
    setEditedTaskStatus(task.status);
    setEditedTaskPriority(task.priority);
    setEditedTaskDueDate(task.dueDate);

    settaskEditModal(true);
  };
  const eupdateEditedTask = (e) => {
    e.preventDefault();

    setProjectTasks(
      (prevTasks) =>
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
            : task,
        ),

      setActivities((prev) => {
        return [
          {
            title: `You edited "${editedTaskTitle}"`,
            time: "Just now",
          },
          ...prev,
        ];
      }),
    );

    settaskEditModal(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    setDeleteTaskModal(true);
    setDeleteTaskId(taskId);
  };

  // this function will run the submission of the command from the delete task modal
  const finalDeleteTask = () => {
    setProjectTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deleteTaskId),
    );
    const deleteItemName = projectTasks.find((task) => {
      return task.id === deleteTaskId;
    });
    console.log(deleteItemName);
    setActivities((prev) => [
      {
        title: `You deleted "${deleteItemName.title}"`,
        time: "Just now",
      },
      ...prev,
    ]);
    setDeleteTaskId(null);
  };

  const markAsComplete = (taskId) => {
    setProjectTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "Completed",
            }
          : task,
      ),
    );

    const completedTask = projectTasks.find((task)=>{
      return task.id === taskId;
    })
    setActivities((prev) => [
      {
        title: `You completed "${completedTask.title}"`,
        time: "Just now",
      },
      ...prev,
    ]);
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
                hover:bg-violet-900
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
                      onDelete={handleDeleteTask}
                      onComplete={markAsComplete}
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
          <div
            className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/70
      px-4
      backdrop-blur-md
    "
          >
            <div
              className="
        w-full max-w-lg
        rounded-2xl
        border border-violet-400/20
        bg-slate-950/80
        p-6
        shadow-[0_0_60px_rgba(139,92,246,0.15)]
        backdrop-blur-2xl
      "
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-white">
                    Create New Task
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a task to this project
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddTaskModel(false)}
                  className="
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/5
            text-slate-400
            transition-all duration-200
            hover:border-violet-400/30
            hover:bg-violet-500/10
            hover:text-white
            hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
          "
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateTask} className="space-y-5">
                {/* Task Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Task Title
                  </label>

                  <input
                    required
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g. Build authentication"
                    className="
              w-full
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              placeholder:text-slate-500
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Description
                  </label>

                  <textarea
                    required
                    rows="3"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe what needs to be done..."
                    className="
              w-full
              resize-none
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              placeholder:text-slate-500
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                  />
                </div>

                {/* Status + Priority */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Status
                    </label>

                    <select
                      required
                      value={editedTaskStatus}
                      onChange={(e) => setEditedTaskStatus(e.target.value)}
                      className="
                w-full
                rounded-xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-white
                outline-none
                transition-all duration-200
                focus:border-violet-400/40
                focus:bg-white/[0.08]
                focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
              "
                    >
                      <option value="Not Started" className="bg-slate-900">
                        Not Started
                      </option>

                      <option value="In Progress" className="bg-slate-900">
                        In Progress
                      </option>

                      <option value="Completed" className="bg-slate-900">
                        Completed
                      </option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Priority
                    </label>

                    <select
                      required
                      value={editedTaskPriority}
                      onChange={(e) => setEditedTaskPriority(e.target.value)}
                      className="
                w-full
                rounded-xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-white
                outline-none
                transition-all duration-200
                focus:border-violet-400/40
                focus:bg-white/[0.08]
                focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
              "
                    >
                      <option value="Low" className="bg-slate-900">
                        Low
                      </option>

                      <option value="Medium" className="bg-slate-900">
                        Medium
                      </option>

                      <option value="High" className="bg-slate-900">
                        High
                      </option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Due Date
                  </label>

                  <input
                    required
                    type="date"
                    value={editedTaskDueDate}
                    onChange={(e) => setEditedTaskDueDate(e.target.value)}
                    className="
              w-full
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModel(false)}
                    className="
              rounded-xl
              border border-white/10
              bg-white/5
              px-5 py-2.5
              text-sm font-medium
              text-slate-300
              transition-all duration-200
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
            "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
              rounded-xl
              border border-violet-400/30
              bg-violet-600
              px-5 py-2.5
              text-sm font-semibold
              text-white
              shadow-[0_0_20px_rgba(139,92,246,0.25)]
              transition-all duration-200
              hover:bg-violet-500
              hover:border-violet-300/50
              hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
              active:scale-95
            "
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      );
      {/* adding edit modal */}
      {taskEditModal && (
        <div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/70
      px-4
      backdrop-blur-md
    "
        >
          <div
            className="
        w-full max-w-lg
        rounded-2xl
        border border-violet-400/20
        bg-slate-950/80
        p-6
        shadow-[0_0_60px_rgba(139,92,246,0.15)]
        backdrop-blur-2xl
      "
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Edit Task
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update your task details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddTaskModel(false)}
                className="
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            border border-white/10
            bg-white/5
            text-slate-400
            transition-all duration-200
            hover:border-violet-400/30
            hover:bg-violet-500/10
            hover:text-white
            hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
          "
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={eupdateEditedTask} className="space-y-5">
              {/* Task Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Task Title
                </label>

                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="
              w-full
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              placeholder:text-slate-500
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  rows="3"
                  value={editedTaskDescription}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                  placeholder="Describe your task"
                  className="
              w-full
              resize-none
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              placeholder:text-slate-500
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                />
              </div>

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Status
                  </label>

                  <select
                    value={editedTaskStatus}
                    onChange={(e) => setEditedTaskStatus(e.target.value)}
                    className="
                w-full
                rounded-xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-white
                outline-none
                transition-all duration-200
                focus:border-violet-400/40
                focus:bg-white/[0.08]
                focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
              "
                  >
                    <option value="Not Started" className="bg-slate-900">
                      Not Started
                    </option>

                    <option value="In Progress" className="bg-slate-900">
                      In Progress
                    </option>

                    <option value="Completed" className="bg-slate-900">
                      Completed
                    </option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Priority
                  </label>

                  <select
                    value={editedTaskPriority}
                    onChange={(e) => setEditedTaskPriority(e.target.value)}
                    className="
                w-full
                rounded-xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-white
                outline-none
                transition-all duration-200
                focus:border-violet-400/40
                focus:bg-white/[0.08]
                focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
              "
                  >
                    <option value="Low" className="bg-slate-900">
                      Low
                    </option>

                    <option value="Medium" className="bg-slate-900">
                      Medium
                    </option>

                    <option value="High" className="bg-slate-900">
                      High
                    </option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Due Date
                </label>

                <input
                  type="date"
                  value={editedTaskDueDate}
                  onChange={(e) => setEditedTaskDueDate(e.target.value)}
                  className="
              w-full
              rounded-xl
              border border-white/10
              bg-white/5
              px-4 py-3
              text-sm text-white
              outline-none
              transition-all duration-200
              focus:border-violet-400/40
              focus:bg-white/[0.08]
              focus:shadow-[0_0_20px_rgba(139,92,246,0.12)]
            "
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => settaskEditModal(false)}
                  className="
              rounded-xl
              border border-white/10
              bg-white/5
              px-5 py-2.5
              text-sm font-medium
              text-slate-300
              transition-all duration-200
              hover:border-white/20
              hover:bg-white/10
              hover:text-white
            "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
              rounded-xl
              border border-violet-400/30
              bg-violet-600
              px-5 py-2.5
              text-sm font-semibold
              text-white
              shadow-[0_0_20px_rgba(139,92,246,0.25)]
              transition-all duration-200
              hover:bg-violet-500
              hover:border-violet-300/50
              hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
              active:scale-95
            "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteTaskModal && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div
            onClick={() => setDeleteModel(false)}
            className="
              absolute inset-0
              bg-black/60
              backdrop-blur-sm
            "
          />

          {/* Modal container */}
          <div
            className="
            relative
            flex min-h-screen
            items-center justify-center
            p-4
          "
          >
            {/* Disclaimer */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-sm
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
              <h2 className="text-xl font-bold text-white mb-3">
                Delete Task?
              </h2>

              <p className="text-sm text-slate-400 leading-relaxed">
                Are you sure you want to delete this Task? This action cannot be
                undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setDeleteTaskModal(false);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    finalDeleteTask();
                    setDeleteTaskModal(false);
                  }}
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-red-600/80
                    hover:bg-red-600
                    transition
                    font-medium
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectDetails;
