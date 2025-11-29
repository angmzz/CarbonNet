import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Target } from "lucide-react";
import { formatNumber } from "../../utils/format";

type IndicatorColor = "danger" | "success" | "primary" | "default" | "warning" | "secondary";

interface Indicator {
  name: string;
  value: number;
  unit: string;
  trend: string;
  color: IndicatorColor;
  history: { name: string; value: number }[];
  status: string;
}

const indicators: Indicator[] = [
  {
    name: "CO₂ emitido",
    value: 1234.00,
    unit: "t",
    trend: "+2%",
    color: "danger",
    status: "Warning",
    history: [
      { name: "Lun", value: 1200 },
      { name: "Mar", value: 1210 },
      { name: "Mie", value: 1220 },
      { name: "Jue", value: 1234 },
      { name: "Vie", value: 1230 },
    ]
  },
  {
    name: "Meta anual",
    value: 900,
    unit: "t",
    trend: "-5%",
    color: "success",
    status: "On Track",
    history: [
      { name: "Lun", value: 950 },
      { name: "Mar", value: 940 },
      { name: "Mie", value: 930 },
      { name: "Jue", value: 920 },
      { name: "Vie", value: 900 },
    ]
  },
  {
    name: "Proyectos activos",
    value: 7,
    unit: "",
    trend: "+1",
    color: "primary",
    status: "On Track",
    history: [
      { name: "Lun", value: 6 },
      { name: "Mar", value: 6 },
      { name: "Mie", value: 7 },
      { name: "Jue", value: 7 },
      { name: "Vie", value: 7 },
    ]
  },
  {
    name: "Reducción mensual",
    value: 120,
    unit: "t",
    trend: "+10%",
    color: "success",
    status: "On Track",
    history: [
      { name: "Lun", value: 100 },
      { name: "Mar", value: 105 },
      { name: "Mie", value: 110 },
      { name: "Jue", value: 115 },
      { name: "Vie", value: 120 },
    ]
  }
];

const chartData = [
  { name: 'Ene', emisiones: 4000 },
  { name: 'Feb', emisiones: 3000 },
  { name: 'Mar', emisiones: 2000 },
  { name: 'Abr', emisiones: 2780 },
  { name: 'May', emisiones: 1890 },
  { name: 'Jun', emisiones: 2390 },
  { name: 'Jul', emisiones: 3490 },
];

const initiativesData = [
  { name: 'Captura', value: 400 },
  { name: 'Reforestación', value: 300 },
  { name: 'Eficiencia', value: 300 },
  { name: 'Energía renovable', value: 200 },
];

const goalsData = [
  { name: '2023', meta: 1000, real: 1250 },
  { name: '2024', meta: 900, real: 1100 },
  { name: '2025', meta: 800, real: 950 },
  { name: '2026', meta: 700, real: 800 },
];

const alertsData = [
  { name: 'Ene', alertas: 2 },
  { name: 'Feb', alertas: 1 },
  { name: 'Mar', alertas: 3 },
  { name: 'Abr', alertas: 0 },
  { name: 'May', alertas: 2 },
  { name: 'Jun', alertas: 1 },
  { name: 'Jul', alertas: 4 },
];

const pieColors = ["#FF6B00", "#FF8F45", "#3b82f6", "#facc15"];

const Indicators: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Indicadores de Desempeño</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((indicator, idx) => (
          <div key={idx} className="p-6 rounded-xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${indicator.status === "On Track" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  indicator.status === "Warning" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                }`}>
                {indicator.status}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">{indicator.name}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-white tracking-tight">
                {formatNumber(indicator.value)}
              </span>
              <span className="text-sm text-slate-500 font-medium">{indicator.unit}</span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={indicator.history}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FF6B00"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Emisiones mensuales proyectadas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dy={10} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dx={-10} tickFormatter={(value) => formatNumber(value)} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#f8fafc', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatNumber(value)}
                />
                <Area
                  type="monotone"
                  dataKey="emisiones"
                  stroke="#FF6B00"
                  fill="#FF6B00"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Distribución de iniciativas</h2>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={initiativesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  stroke="none"
                >
                  {initiativesData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Metas vs. Emisiones reales</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dy={10} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dx={-10} tickFormatter={(value) => formatNumber(value)} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#f8fafc', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatNumber(value)}
                />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
                <Bar dataKey="meta" fill="#3b82f6" name="Meta" radius={[4, 4, 0, 0]} />
                <Bar dataKey="real" fill="#FF6B00" name="Real" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Alertas mensuales</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dy={10} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', color: '#f8fafc', borderRadius: '0.5rem' }} />
                <Legend wrapperStyle={{ color: '#94a3b8' }} />
                <Line type="monotone" dataKey="alertas" stroke="#facc15" name="Alertas" strokeWidth={3} dot={{ r: 4, fill: "#facc15" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
