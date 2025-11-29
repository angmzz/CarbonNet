import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut, Settings, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-transparent text-slate-200 font-sans selection:bg-primary/20 selection:text-primary">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out relative",
        collapsed ? "ml-0" : "ml-64"
      )}>
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 h-16 px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger could go here */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
              >
                <div className="hidden md:flex flex-col items-end mr-1">
                  <span className="text-sm font-medium text-slate-200">{user?.name || "Usuario"}</span>
                  <span className="text-xs text-slate-400">{user?.email || "admin@bhp.com"}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-white/10 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-white/5 md:hidden">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                    <User className="h-4 w-4" /> Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2 transition-colors">
                    <Settings className="h-4 w-4" /> Configuración
                  </button>
                  <div className="border-t border-white/5 my-1"></div>
                  <button
                    onClick={() => { logout(); navigate("/login"); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 relative">
          {/* Glassmorphism decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
          </div>
          <div className="relative z-10">
            <DashboardContent />
          </div>
        </main>
      </div>
    </div>
  );
}