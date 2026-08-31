const TaskCard = ({
  id,
  projectId,
  title,
  description,
  status,
  priority,
  dueDate,
}) => {
  return (
    <div className=" mb-3 group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07] ">

      {/* Top section */}
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>

        <button className="shrink-0 rounded-lg px-2 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
          ⋮
        </button>

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
          <p className="text-xs text-slate-500">
            Due date
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {dueDate}
          </p>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300">
          ✓
        </button>

      </div>

    </div>
  );
};

export default TaskCard;