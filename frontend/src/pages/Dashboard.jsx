import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import ProjectProgress from "../components/ProjectProgress";
import ProductivityChart from "../components/ProductivityChart";

const Dashboard = ({ projects, projectTasks ,activities  }) => {
  const completedTask = projectTasks.filter((tasks) => {
    return tasks.status === "Completed";
  }).length;

  const pendingTask = projectTasks.filter((tasks) => {
    return tasks.status === "Not Started";
  }).length;

  const inProcessTask = projectTasks.filter((task) => {
    return task.status === "In Progress";
  }).length;

console.log("PROJECTS:", projects);
console.log("TASKS:", projectTasks);

  const totalTask = projectTasks.length;

  const projectProgress = totalTask===0 ?0:Math.round((completedTask / totalTask) * 100);


  return (
    <div className="h-screen bg-slate-950 text-white flexmin-h-screen bg-slate-950 text-white flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto scroll-smooth">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Total Projects" value={projects.length} />

            <StatCard title="Completed Tasks" value={completedTask} />

            <StatCard title="In Progress" value={inProcessTask} />

            <StatCard title="Pending Tasks" value={pendingTask} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-5">
            {/* Project Progress */}
            <ProjectProgress progress={projectProgress} completed = {completedTask} inProgress ={inProcessTask} pending={pendingTask} />

            {/* Recent Activity - temporary */}
            <div
              className="
                h-80 rounded-3xl p-6
                bg-gradient-to-br
                from-white/5
                via-slate-900/40
                to-violet-900/50
                backdrop-blur-xl
                border border-white/10
                shadow-xl
                hover:from-white/10
                hover:to-violet-900/60
                hover:border-violet-400/30
                hover:shadow-violet-500/10
                transition-all duration-300
            "
            >
              <h2 className="pb-6 text-center text-2xl font-bold text-white">
                Recent Activity
              </h2>

              <div className="h-56 overflow-y-auto pr-2 custom-scrollbar">
                {activities.map((data ) => (
                  <RecentActivity
                  
                    task={data.title}
                    time={data.time}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-10 h-80 rounded-3xl p-6
  bg-gradient-to-br
  from-white/5
  via-slate-900/40
  to-violet-900/50
  backdrop-blur-xl
  border border-white/10
  shadow-xl
  hover:from-white/10
  hover:to-violet-900/60
  hover:border-violet-400/30
  hover:shadow-violet-500/10
  transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white">
              Productivity Analytics
            </h2>

            <ProductivityChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
