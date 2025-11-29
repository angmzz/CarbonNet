import React, { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "success" | "warning" | "error" | "info";
  message: string;
  onClose?: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ type, message, onClose }) => {
  const [fading, setFading] = useState(false);

  const iconMap = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info,
  };

  const colorMap = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const IconComponent = iconMap[type];

  const handleClose = () => {
    setFading(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 350);
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
      colorMap[type],
      fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
    )}>
      <div className="flex items-center gap-3">
        <IconComponent className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className="p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;