import React from "react";

const KanbanTaskCard = ({ task, project,  onStatusChange }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", String(task.id));
      }}
      className="
        mb-3
        group
        rounded-2xl
        border border-white/10
        bg-[#171b2e]
        p-5
        shadow-[0_0_25px_rgba(139,92,246,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-400/30
        hover:bg-[#1a1f35]
        hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]
        cursor-grab
        active:cursor-grabbing
      "
    >
      {/* Top section */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mt-4 text-xs text-slate-500">
  {project?.title || "No Project"}
</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {task.description}
          </p>
        </div>
      </div>

      {/* Status + Priority */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          {task.status}
        </span>
        <select
  value={task.status}
  onChange={(e) =>
    onStatusChange(task.id, e.target.value)
  }
  className="
    rounded-lg
    border border-white/10
    bg-slate-900
    px-3 py-2
    text-sm
    text-slate-300
    outline-none
    focus:border-violet-400/50
  "
>
  <option value="Not Started">Not Started</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

        <span
  className={`
    rounded-full border px-3 py-1 text-xs font-medium
    ${
      task.priority === "High"
        ? "border-red-400/30 bg-red-500/10 text-red-300"
        : task.priority === "Medium"
        ? "border-yellow-400/30 bg-yellow-500/10 text-yellow-300"
        : "border-green-400/30 bg-green-500/10 text-green-300"
    }
  `}
>
  {task.priority} Priority
</span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-white/10" />

      {/* Bottom section */}
      <div>
  <p className="text-xs text-slate-500">Due date</p>

  <p
    className={`
      mt-1 text-sm font-medium
      ${
        task.dueDate &&
        new Date(task.dueDate) < new Date()
          ? "text-red-400"
          : "text-slate-300"
      }
    `}
  >
    {task.dueDate &&
    new Date(task.dueDate) < new Date()
      ? "⚠ Overdue"
      : task.dueDate}
  </p>
</div>
    </div>
  );
};

export default KanbanTaskCard;