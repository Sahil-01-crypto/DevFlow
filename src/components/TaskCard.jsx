import { useState } from "react";

const TaskCard = ({
  id,
  projectId,
  title,
  description,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const [taskEditModal, settaskEditModal] = useState(false);
  return (
    <div className="  mb-3 group
    rounded-2xl
    border border-white/10
    bg-[#171b2e]
    p-5
    shadow-[0_0_25px_rgba(139,92,246,0.06)]
    transition-all duration-300
    hover:-translate-y-1
    hover:border-violet-400/30
    hover:bg-[#1a1f35]
    hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] ">
      {/* Top section */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onEdit(id);
            }}
            className="
      rounded-lg
      border border-violet-400/30
      bg-violet-500/10
      px-3 py-1.5
      text-sm font-medium text-violet-300
      shadow-[0_0_12px_rgba(139,92,246,0.15)]
      transition-all duration-200
      hover:border-violet-400/60
      hover:bg-violet-600/20
      hover:text-violet-200
      hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]
      active:scale-95
    "
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDelete(id);
            }}
            className="
      rounded-lg
      border border-red-400/30
      bg-red-500/10
      px-3 py-1.5
      text-sm font-medium text-red-300
      shadow-[0_0_12px_rgba(248,113,113,0.12)]
      transition-all duration-200
      hover:border-red-400/60
      hover:bg-red-600/20
      hover:text-red-200
      hover:shadow-[0_0_30px_rgba(248,113,113,0.30)]
      active:scale-95
    "
          >
            Delete
          </button>
        </div>
      </div>

      {/* Status + Priority */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          {status}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
          {priority} Priority
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-white/10" />

      {/* Bottom section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Due date</p>

          <p className="mt-1 text-sm font-medium text-slate-300">{dueDate}</p>
        </div>

        <button
          onClick={() => {
            onComplete(id);
          }}
          className="
    flex h-9 w-9 items-center justify-center
    rounded-xl
    border border-violet-400/30
    bg-violet-500/10
    text-violet-300
    shadow-[0_0_12px_rgba(139,92,246,0.15)]
    transition-all duration-200
    hover:border-violet-400/60
    hover:bg-violet-500/20
    hover:text-violet-200
    hover:shadow-[0_0_18px_rgba(139,92,246,0.35)]
    active:scale-95
  "
        >
          ✓
        </button>
      </div>

      {/* Edit Task Modal below*/}
    </div>
  );
};

export default TaskCard;
