import React from "react";
import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import KanbanColumn from "../components/KanbanColumn";

const Kanban = ({ projects, projectTasks, setProjectTasks }) => {
  const notStartedTasks = projectTasks.filter(
    (task) => task.status === "Not Started",
  );

  const inProgressTasks = projectTasks.filter(
    (task) => task.status === "In Progress",
  );

  const completedTasks = projectTasks.filter(
    (task) => task.status === "Completed",
  );

  const handleStatusChange = (taskId, newStatus) => {
    setProjectTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold mb-2">Kanban Board</h1>

          <p className="text-slate-500 mb-8">Organize and track your tasks</p>

          <div className="flex gap-6">
            <KanbanColumn
              title="Not Started"
              tasks={notStartedTasks}
              projects={projects}
              onStatusChange={handleStatusChange}
            />

            <KanbanColumn
              title="In Progress"
              tasks={inProgressTasks}
              projects={projects}
              onStatusChange={handleStatusChange}
            />

            <KanbanColumn
              title="Completed"
              tasks={completedTasks}
              projects={projects}
              onStatusChange={handleStatusChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Kanban;
