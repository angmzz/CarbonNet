import React, { useState } from "react";
import { Cloud, TrendingDown, TrendingUp, Zap, CheckCircle, Download, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import AlertBanner from "../common/AlertBanner";
import { formatNumber } from "../../utils/format";

const chartData = [
  { name: 'Ene', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const pieData = [
  { name: 'Energía', value: 45, color: '#FF6B00' },
  { name: 'Transporte', value: 30, color: '#3b82f6' },
  { name: 'Residuos', value: 15, color: '#22c55e' },
  { name: 'Otros', value: 10, color: '#eab308' },
];

const stats = [
  { title: "Emisiones Totales", value: 1234.00, unit: "tCO2e", icon: Cloud, change: "-12%", trend: "down", trendUp: false },
  { title: "Reducción Anual", value: 15, unit: "%", icon: TrendingDown, change: "+5%", trend: "up", trendUp: true },
  { title: "Iniciativas Activas", value: 8, unit: "", icon: Zap, change: "+2", trend: "up", trendUp: true },
  { title: "Cumplimiento", value: 98, unit: "%", icon: CheckCircle, change: "+1%", trend: "up", trendUp: true },
];

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
}

const StatCard = ({ title, value, unit, trend, icon: Icon, trendUp }: StatCardProps) => (
  <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 hover:border-primary/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon className="w-16 h-16 text-primary" />
    </div>
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(255,107,0,0.15)]">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-white tracking-tight">
        {typeof value === 'number' ? formatNumber(value) : value}
      </span>
      <span className="text-sm text-slate-500 font-medium">{unit}</span>
    </div>
    <div className={`flex items-center gap-1 mt-4 text-xs font-medium ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
      {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {trend}
      <span className="text-slate-500 ml-1">vs mes anterior</span>
    </div>
  </div>
);

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// ... existing imports

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleExport = () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Generando reporte de exportación...',
      success: 'Datos exportados correctamente',
      error: 'Error al exportar datos',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Panel General</h1>
          <p className="text-slate-400 mt-1">Resumen de emisiones y KPIs operativos.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium border border-white/10"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => navigate('/dashboard/history')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
          >
            <Activity className="w-4 h-4" />
            Ver todo el historial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white/90">Emisiones en Tiempo Real</h2>
            <div className="flex gap-2">
              {['1H', '24H', '7D', '1M', '1Y'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${period === '24H'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  tickFormatter={(value) => formatNumber(value)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: number) => [formatNumber(value), 'tCO2e']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 flex flex-col">
          <h2 className="text-xl font-semibold text-white/90 mb-6">Desglose por Fuente</h2>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-3xl font-bold text-white block">{formatNumber(2450)}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Total tCO2e</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                  formatter={(value: number) => formatNumber(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-medium text-slate-200">{formatNumber(item.value)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;