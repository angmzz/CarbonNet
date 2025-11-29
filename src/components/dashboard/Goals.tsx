import React, { useState } from "react";
import { Target, Plus, Eye, Edit } from "lucide-react";
import { formatNumber } from "../../utils/format";
import { toast } from "sonner";
import Modal from "../common/Modal";

const goals = [
  { id: 1, title: "Reducción Q4 2024", deadline: "2024-12-31", status: "En progreso", progress: 75, current: 750, target: 1000 },
  { id: 2, title: "Eficiencia Energética", deadline: "2025-06-30", status: "Completado", progress: 100, current: 500, target: 500 },
  { id: 3, title: "Residuos Cero", deadline: "2024-10-01", status: "Pendiente", progress: 20, current: 100, target: 500 }
];

const Goals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      toast.success("Nueva meta establecida correctamente");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Metas y Objetivos</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white/90">Metas de Reducción</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Nueva meta
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal, idx) => (
            <div key={goal.id} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-white/10 group-hover:border-primary/30 transition-colors">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{goal.title}</h3>
                    <p className="text-xs text-slate-400">Vence: {goal.deadline}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${goal.status === "En progreso" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                  goal.status === "Completado" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}>
                  {goal.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progreso</span>
                  <span className="text-white font-medium">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out glow-orange"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Actual: {formatNumber(goal.current)} tCO2e</span>
                  <span>Meta: {formatNumber(goal.target)} tCO2e</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-end gap-2">
                <button
                  onClick={() => toast.info("Detalles de meta")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors border border-white/10 text-xs"
                >
                  <Eye className="w-3 h-3" /> Ver
                </button>
                <button
                  onClick={() => toast.info("Edición en desarrollo")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors border border-white/10 text-xs"
                >
                  <Edit className="w-3 h-3" /> Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Establecer Nueva Meta"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddGoal}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Crear Meta"}
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Título de la Meta</label>
            <input
              type="text"
              placeholder="Ej. Reducción Q4 2024"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Objetivo (tCO2e)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Fecha Límite</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Goals;