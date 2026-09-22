import { Search, Bell, Moon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between
      bg-white/[0.02]
      backdrop-blur-sm
      border-b border-white/10">

     <p
  className="
    text-2xl font-bold tracking-tight
    bg-gradient-to-r
    from-violet-300
    via-purple-400
    to-fuchsia-400
    bg-clip-text text-transparent
    drop-shadow-[0_0_12px_rgba(139,92,246,0.25)]
  "
>
  Plan less. Build more.
</p>
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