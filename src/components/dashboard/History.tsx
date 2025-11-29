import React from "react";
import { History as HistoryIcon, Download, Filter, Search } from "lucide-react";
import { toast } from "sonner";

const historyLog = [
  { id: 1, action: "Actualización de Emisiones", user: "Carlos Ruiz", date: "26/10/2023 14:30", details: "Ingreso manual de datos Planta A" },
  { id: 2, action: "Creación de Nueva Meta", user: "Ana García", date: "26/10/2023 11:15", details: "Meta Q4 2024 establecida" },
  { id: 3, action: "Generación de Reporte", user: "Sistema", date: "26/10/2023 09:00", details: "Reporte automático semanal" },
  { id: 4, action: "Alerta Resuelta", user: "Miguel Ángel", date: "25/10/2023 16:45", details: "Incidente #452 cerrado" },
  { id: 5, action: "Inicio de Sesión", user: "Ana García", date: "25/10/2023 08:30", details: "Acceso desde IP 192.168.1.45" },
];

const History: React.FC = () => {
  const handleExport = () => {
    toast.success("Historial exportado a CSV");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Historial y Auditoría</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white/90">Registro de Actividad</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full sm:w-64 pl-9 pr-3 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium border border-white/10">
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
        <div className="relative border-l border-white/10 ml-3 space-y-6">
          {historyLog.map((item) => (
            <div key={item.id} className="relative pl-8 group">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-900 group-hover:bg-primary transition-colors ring-4 ring-slate-900"></span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-xs font-mono text-slate-500 min-w-[120px]">{item.date}</span>
                <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-white/5 hover:border-primary/30 transition-all">
                  <p className="text-sm text-white font-medium">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">Usuario: <span className="text-slate-300">{item.user}</span></span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{item.details}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => toast.info("Cargando más registros...")}
            className="text-sm text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
          >
            Cargar más actividad
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
