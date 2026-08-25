import Sidebar from "../components/Slidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import ProjectProgress from "../components/ProjectProgress";
import ProductivityChart from "../components/ProductivityChart";

const Dashboard = () => {
  const activities = [
    {
      title: "You completed Authentication",
      time: " 2 hours ago",
    },

    {
      title: "New project DevFlow created",
      time: " 5 hours ago",
    },

    {
      title: "Task Navbar UI completed",
      time: " Yesterday",
    },

    {
      title: " You joined Frontend Team",
      time: "  Yesterday",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white flexmin-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Projects" value="12" />

            <StatCard title="Completed Tasks" value="128" />

            <StatCard title="In Progress" value="32" />

            <StatCard title="Pending Tasks" value="48" />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-5">
            {/* Project Progress */}
            <ProjectProgress progress={68} />

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
                {activities.map((data, index) => (
                  <RecentActivity
                    key={index}
                    task={data.title}
                    time={data.time}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 h-80 rounded-3xl p-6
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
  transition-all duration-300">

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
