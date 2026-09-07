import React from "react";
import KanbanTaskCard from "./KanbanTaskCard";
import { useState } from "react";

const KanbanColumn = ({ title, tasks, projects, onStatusChange }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();

        const taskId = Number(e.dataTransfer.getData("taskId"));

        onStatusChange(taskId, title);
        setIsDragOver(false);
      }}
      className={`
    flex-1
    rounded-2xl
    bg-white/5
    border
    p-5
    transition-all
    duration-200
    ${
      isDragOver
        ? "border-violet-400/60 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        : "border-white/10"
    }
  `}
    >
      <h2 className="text-xl font-bold text-white mb-5 flex items-center justify-between">
        <span>{title}</span>

        <span className="text-sm font-medium text-slate-400">
          {tasks.length}
        </span>
      </h2>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-slate-500">
            No tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              project={projects.find(
                (project) => project.id === task.projectId,
              )}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
