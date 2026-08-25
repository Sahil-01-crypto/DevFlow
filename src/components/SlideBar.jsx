import React from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Settings,
} from "lucide-react";
const SlideBar = () => {
  return (
  <aside className="w-64 min-h-screen bg-white/[0.03] backdrop-blur-xl border-r border-white/10 p-5">

      {/* Logo */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight">
          Dev<span className="text-violet-400">Flow</span>
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Developer workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl
          bg-violet-500/15
          border border-violet-400/20
          text-violet-300
          shadow-lg shadow-violet-500/5">

          <LayoutDashboard size={19} />
          <span className="text-sm font-medium">Dashboard</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl
          text-slate-400
          hover:bg-white/5
          hover:text-white
          transition-all duration-200
          cursor-pointer">

          <FolderKanban size={19} />
          <span className="text-sm font-medium">Projects</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl
          text-slate-400
          hover:bg-white/5
          hover:text-white
          transition-all duration-200
          cursor-pointer">

          <ListTodo size={19} />
          <span className="text-sm font-medium">Tasks</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl
          text-slate-400
          hover:bg-white/5
          hover:text-white
          transition-all duration-200
          cursor-pointer">

          <Settings size={19} />
          <span className="text-sm font-medium">Settings</span>
        </div>

      </nav>

    </aside>
  )
}

export default SlideBar
