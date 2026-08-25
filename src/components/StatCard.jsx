import React from "react";

const StatCard = (props) => {
  return (
   
      <div className="group w-60 h-40 m-2 rounded-3xl p-5
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      shadow-xl
      hover:bg-white/10
      hover:border-violet-400/30
      hover:shadow-violet-500/10
      transition-all duration-300
      bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950">

      <div className="text-sm font-medium text-gray-400">
        {props.title}
      </div>

      <div className="mt-4 text-4xl font-bold text-white">
        {props.value}
      </div>

      <div className="mt-2 text-sm text-emerald-400">
        ↑ 12.5% this month
      </div>

    </div>
  );
};

export default StatCard;
