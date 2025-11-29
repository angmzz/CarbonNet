import React from "react";
import { Play, RefreshCw, BarChart3, ArrowRight, Plus } from "lucide-react";
import { formatNumber } from "../../utils/format";
import { toast } from "sonner";

const scenarios = [
  {
    id: 1,
    name: "Optimización de Flota",
    description: "Reemplazo del 20% de camiones por eléctricos.",
    impact: "Alta",
    reduction: 1200,
    cost: 500000,
    roi: "18 meses"
  },
  {
    id: 2,
    name: "Energía Solar Planta Norte",
    description: "Instalación de paneles solares en techos de almacenes.",
    impact: "Media",
    reduction: 450,
    cost: 120000,
    roi: "36 meses"
  },
  {
    id: 3,
    name: "Reciclaje de Agua",
    description: "Implementación de sistema de circuito cerrado.",
    impact: "Baja",
    reduction: 150,
    cost: 80000,
    roi: "24 meses"
  }
];

const Scenarios: React.FC = () => {
  const handleSimulate = (name: string) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: `Simulando escenario: ${name}...`,
      success: 'Simulación completada. Resultados actualizados.',
      error: 'Error en la simulación',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Simulación de Escenarios</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white/90">Escenarios Disponibles</h2>
          <button
            onClick={() => toast.info("Creación de escenarios en desarrollo")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Nuevo escenario
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{scenario.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{scenario.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${scenario.impact === "Alta" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  scenario.impact === "Media" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                    "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                  Impacto {scenario.impact}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Reducción Est.</span>
                  <p className="text-lg font-bold text-white mt-0.5">{formatNumber(scenario.reduction)} tCO2e</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Costo Est.</span>
                  <p className="text-lg font-bold text-white mt-0.5">${formatNumber(scenario.cost)}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">ROI Est.</span>
                  <p className="text-lg font-bold text-white mt-0.5">{scenario.roi}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors text-xs font-medium border border-white/10">
                  <BarChart3 className="w-3 h-3" /> Ver detalles
                </button>
                <button
                  onClick={() => handleSimulate(scenario.name)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium border border-primary/20"
                >
                  <ArrowRight className="w-3 h-3" /> Simular
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
