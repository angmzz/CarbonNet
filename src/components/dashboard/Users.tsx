import React, { useState } from "react";
import { User, Mail, Shield, MoreVertical, UserPlus } from "lucide-react";
import { toast } from "sonner";
import Modal from "../common/Modal";

const users = [
  { id: 1, name: "Ana García", email: "ana.garcia@carbonnet.com", role: "Admin", status: "Activo" },
  { id: 2, name: "Carlos Ruiz", email: "carlos.ruiz@carbonnet.com", role: "Editor", status: "Activo" },
  { id: 3, name: "Elena Torres", email: "elena.torres@carbonnet.com", role: "Viewer", status: "Inactivo" },
  { id: 4, name: "Miguel Ángel", email: "miguel.angel@carbonnet.com", role: "Editor", status: "Activo" },
];

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      toast.success("Usuario invitado correctamente");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Gestión de Usuarios</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white/90">Usuarios del Sistema</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/20 glow-orange"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo usuario
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm">
                <th className="py-3 px-4 font-medium">Usuario</th>
                <th className="py-3 px-4 font-medium">Rol</th>
                <th className="py-3 px-4 font-medium">Estado</th>
                <th className="py-3 px-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                        <User className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200 group-hover:text-white transition-colors">{user.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Shield className="w-3 h-3 text-slate-500" />
                      {user.role}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${user.status === "Activo" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-slate-700 text-slate-400 border-slate-600"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toast.info(`Opciones para ${user.name}`)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invitar Nuevo Usuario"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddUser}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar Invitación"}
            </button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nombre Completo</label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="juan.perez@empresa.com"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Rol</label>
            <select className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
