import React from "react";
import { Lightbulb, ArrowRight, Leaf, DollarSign, Clock } from "lucide-react";
import { formatNumber } from "../../utils/format";

const initiatives = [
  {
    id: 1,
    title: "Modernización de Flota",
    description: "Sustitución progresiva de vehículos diésel por eléctricos.",
    impact: 1200,
    cost: 450000,
    status: "En curso",
    progress: 35
  },
  {
    id: 2,
    title: "Paneles Solares Planta B",
    description: "Instalación de 500m² de paneles fotovoltaicos.",
    impact: 350,
    cost: 120000,
    status: "Planificación",
    progress: 10
  },
  {
    id: 3,
    title: "Optimización HVAC",
    description: "Actualización de sistemas de climatización con IA.",
    impact: 180,
    cost: 45000,
    status: "Completado",
    progress: 100
  }
];

const Initiatives: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Iniciativas de Reducción</h1>
      <div className="grid grid-cols-1 gap-6">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6 hover:border-primary/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">{initiative.title}</h3>
                </div>
                <p className="text-slate-400 mb-4 ml-12">{initiative.description}</p>

                <div className="grid grid-cols-3 gap-4 ml-12">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-xs text-slate-500 block">Reducción</span>
                      <span className="text-sm font-bold text-white">{formatNumber(initiative.impact)} tCO2e</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <div>
                      <span className="text-xs text-slate-500 block">Inversión</span>
                      <span className="text-sm font-bold text-white">${formatNumber(initiative.cost)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <div>
                      <span className="text-xs text-slate-500 block">Estado</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${initiative.status === "Completado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        initiative.status === "En curso" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                          "bg-slate-700 text-slate-300 border border-slate-600"
                        }`}>
                        {initiative.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-48 flex flex-col justify-center gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Progreso</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(255,107,0,0.4)]"
                      style={{ width: `${initiative.progress}%` }}
                    />
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-white/10 transition-all text-sm font-medium group-hover:shadow-[0_0_15px_rgba(255,107,0,0.15)]">
                  Ver detalles <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
