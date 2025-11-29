import React from "react";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { formatNumber } from "../../utils/format";
import { toast } from "sonner";

const reports = [
  { id: 1, name: "Reporte Anual de Emisiones 2024", type: "PDF", size: "2.4 MB", date: "15/10/2024", status: "Finalizado" },
  { id: 2, name: "Auditoría Energética Q3", type: "PDF", size: "1.8 MB", date: "01/10/2024", status: "Finalizado" },
  { id: 3, name: "Proyección de Reducción 2025", type: "Excel", size: "450 KB", date: "28/09/2024", status: "Borrador" },
  { id: 4, name: "Análisis de Huella Hídrica", type: "PDF", size: "3.2 MB", date: "10/09/2024", status: "Finalizado" },
];

const Reports: React.FC = () => {
  const handleGenerateReport = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    toast.promise(promise, {
      loading: 'Generando reporte personalizado...',
      success: 'Reporte generado y listo para descargar',
      error: 'Error al generar el reporte',
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Reportes y Documentación</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white/90">Documentos Recientes</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium border border-white/10">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
            >
              <FileText className="w-4 h-4" />
              Generar reporte
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/5 hover:border-primary/30 hover:bg-slate-800/80 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-900 border border-white/10 group-hover:border-primary/30 transition-colors">
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{report.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${report.status === "Finalizado" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}>
                  {report.status}
                </span>
                <button
                  onClick={() => toast.success(`Descargando ${report.name}...`)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
