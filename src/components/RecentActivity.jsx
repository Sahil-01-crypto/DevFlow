const RecentActivity = (props) => {
 console.log(props.task);
 
  
  return (
    <div className="flex items-start gap-3 pb-4 mb-4 border-b border-white/10">

      <div className="w-2 h-2 mt-2 rounded-full bg-violet-400" />

      <div>
        <div className="text-sm text-white">
          {props.task}
        </div>

        <div className="text-xs text-slate-500 mt-1">
          {props.time}
        </div>
      </div>

    </div>
  );
};

export default RecentActivity;