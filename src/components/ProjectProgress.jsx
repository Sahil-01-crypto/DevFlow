const ProjectProgress = ({ progress , completed , inProgress , pending ,  }) => {
  return (
    <div
      className="
        h-80 rounded-3xl p-6
        bg-gradient-to-br from-white/5 via-slate-900/40 to-violet-900/50
        backdrop-blur-xl
        border border-white/10
        shadow-xl
        hover:from-white/10 hover:to-violet-900/60
        hover:border-violet-400/30
        hover:shadow-violet-500/10
        transition-all duration-300
      "
    >
      <h2 className="text-center text-2xl font-bold text-white">
        Project Progress
      </h2>

      <div className="flex justify-between mt-8 mb-3">
        <span className="text-slate-300">
          Overall Progress
        </span>

        <span className="font-semibold text-white">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="
            h-full rounded-full
            bg-gradient-to-r
            from-violet-600
            to-purple-400
            transition-all duration-500
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats */}
      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span className="text-slate-300">Completed</span>
          <span className="font-semibold">{completed}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-300">In Progress</span>
          <span className="font-semibold">{inProgress}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-300">Pending</span>
          <span className="font-semibold">{pending}</span>
        </div>

      </div>
    </div>
  );
};

export default ProjectProgress;
