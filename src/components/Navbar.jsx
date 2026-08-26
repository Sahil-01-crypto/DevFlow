import { Search, Bell, Moon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between
      bg-white/[0.02]
      backdrop-blur-sm
      border-b border-white/10">

      <div className="flex items-center gap-3
        w-80 px-4 py-2.5
        rounded-xl
        bg-white/[0.04]
        border border-white/10">

        <Search size={18} className="text-slate-500" />

        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none text-sm text-white
          placeholder:text-slate-600 w-full"
        />
      </div>

      <div className="flex items-center gap-5">

        <Bell
          size={20}
          className="text-slate-400 hover:text-white cursor-pointer transition"
        />

        <Moon
          size={20}
          className="text-slate-400 hover:text-white cursor-pointer transition"
        />

        <div className="w-9 h-9 rounded-xl
          bg-gradient-to-br from-violet-500 to-indigo-600
          flex items-center justify-center
          font-semibold shadow-lg shadow-violet-500/20">

          S
        </div>

      </div>

    </header>
  );
};

export default Navbar;