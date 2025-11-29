import React, { useState } from "react";
import { Plus, Filter, Factory, Truck, Zap } from "lucide-react";
import { formatNumber } from "../../utils/format";
import { toast } from "sonner";
import Modal from "../common/Modal";

const emissionsSources = [
  { id: 1, name: "Planta Principal", category: "Industrial", location: "Zona Industrial A", date: "2023-10-26", value: 1250.5 },
  { id: 2, name: "Flota de Transporte", category: "Transporte", location: "Centro Logístico", date: "2023-10-25", value: 450.2 },
  { id: 3, name: "Generadores Auxiliares", category: "Energía", location: "Planta Norte", date: "2023-10-24", value: 120.0 },
  { id: 4, name: "Calderas de Vapor", category: "Industrial", location: "Planta Principal", date: "2023-10-23", value: 800.7 },
  { id: 5, name: "Vehículos Eléctricos", category: "Transporte", location: "Estación de Carga", date: "2023-10-22", value: 50.1 },
];

const Emissions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      toast.success("Nueva fuente de emisión añadida correctamente");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Registro de Emisiones</h1>
          <p className="text-slate-400 mt-1">Gestiona y monitorea las fuentes de emisión.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium border border-white/10">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Nueva fuente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {emissionsSources.map((source) => (
          <div key={source.id} className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg border border-white/10 ${source.category === "Energía" ? "bg-orange-500/10 text-orange-400" :
                    source.category === "Transporte" ? "bg-blue-500/10 text-blue-400" :
                      "bg-green-500/10 text-green-400"
                  }`}>
                  {source.category === "Energía" ? <Zap className="w-6 h-6" /> :
                    source.category === "Transporte" ? <Truck className="w-6 h-6" /> :
                      <Factory className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{source.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-400">{source.location}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sm text-slate-400">{source.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{formatNumber(source.value)}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">tCO2e</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-end gap-2">
              <button
                onClick={() => toast.info("Funcionalidad de edición en desarrollo")}
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
              >
                Editar
              </button>
              <button
                onClick={() => toast.error("No tienes permisos para eliminar este registro")}
                className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors px-2 py-1"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nueva Fuente"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddSource}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar Registro"}
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nombre de la Fuente</label>
            <input
              type="text"
              placeholder="Ej. Generador Principal"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Categoría</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option>Energía</option>
                <option>Transporte</option>
                <option>Procesos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Ubicación</label>
              <input
                type="text"
                placeholder="Ej. Planta Norte"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Emisiones (tCO2e)</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Emissions;
