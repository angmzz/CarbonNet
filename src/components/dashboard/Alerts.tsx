import React from "react";
import { AlertTriangle, CheckCircle, Bell, XCircle } from "lucide-react";
import { toast } from "sonner";

const alerts = [
  { id: 1, type: "Crítica", message: "Emisiones de CO2 exceden límite diario en Planta A", time: "Hace 10 min", source: "Sensor #A-124" },
  { id: 2, type: "Advertencia", message: "Consumo energético inusual detectado", time: "Hace 45 min", source: "Medidor Principal" },
  { id: 3, type: "Info", message: "Reporte mensual generado automáticamente", time: "Hace 2 horas", source: "Sistema" },
  { id: 4, type: "Advertencia", message: "Mantenimiento preventivo requerido", time: "Hace 5 horas", source: "Caldera B" },
];

const Alerts: React.FC = () => {
  const handleResolve = (id: number) => {
    toast.success("Alerta marcada como resuelta");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Alertas y Notificaciones</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white/90">Alertas Activas</h2>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Crítica
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Advertencia
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Info
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border flex items-start gap-4 transition-all hover:translate-x-1 ${alert.type === "Crítica" ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10" :
                alert.type === "Advertencia" ? "bg-yellow-500/5 border-yellow-500/20 hover:bg-yellow-500/10" :
                  "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10"
              }`}>
              <div className={`p-2 rounded-lg ${alert.type === "Crítica" ? "bg-red-500/10 text-red-400" :
                  alert.type === "Advertencia" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-blue-500/10 text-blue-400"
                }`}>
                {alert.type === "Crítica" ? <XCircle className="w-5 h-5" /> :
                  alert.type === "Advertencia" ? <AlertTriangle className="w-5 h-5" /> :
                    <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-white">{alert.message}</h3>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-400 mt-1">Fuente: {alert.source}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3" /> Marcar como resuelta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
