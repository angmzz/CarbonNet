import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Target,
  BarChart2,
  FileText,
  Zap,
  GitBranch,
  Bell,
  History,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, label: "Inicio", path: "/dashboard" },
  { icon: ClipboardList, label: "Registro de emisiones", path: "/dashboard/emissions" },
  { icon: Target, label: "Metas y objetivos", path: "/dashboard/goals" },
  { icon: BarChart2, label: "Indicadores y gráficos", path: "/dashboard/indicators" },
  { icon: FileText, label: "Informes", path: "/dashboard/reports" },
  { icon: Zap, label: "Iniciativas de mitigación", path: "/dashboard/initiatives" },
  { icon: GitBranch, label: "Simulación de escenarios", path: "/dashboard/scenarios" },
  { icon: Bell, label: "Alertas y notificaciones", path: "/dashboard/alerts" },
  { icon: History, label: "Historial/Auditoría", path: "/dashboard/history" },
  { icon: Users, label: "Gestión de usuarios", path: "/dashboard/users" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "16rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen z-40 bg-slate-950/90 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-black/50 flex flex-col"
          >
            <div className="p-6 flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r bg-clip-text truncate">
                BHP CarbonNet
              </span>
              <button
                onClick={() => setCollapsed(true)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    )}
                  >
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full glow-orange"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      location.pathname === item.path ? "text-primary drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    <span className="font-medium text-sm truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">John Doe</p>
                  <p className="text-xs text-slate-400 truncate">Admin</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {collapsed && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
};

export default Sidebar;