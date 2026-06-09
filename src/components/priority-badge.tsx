import { AlertCircle, Clock, ShieldAlert } from "lucide-react";

function PriorityBadge({ priority}: { priority: string }) {
  const config: Record<string, { label: string; className: string; icon: any }> = {
    LOW: { label: "Low", className: "text-slate-500 bg-slate-50", icon: Clock },
    MEDIUM: { label: "Medium", className: "text-blue-600 bg-blue-50", icon: Clock },
    HIGH: { label: "High", className: "text-amber-600 bg-amber-50", icon: AlertCircle },
    URGENT: { label: "Urgent", className: "text-red-600 bg-red-50 animate-pulse", icon: ShieldAlert },
  };

  const current = config[priority] || config.MEDIUM;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${current.className}`}>
      <Icon className="w-3 h-3" />
      {current.label}
    </span>
  );
}

export default PriorityBadge;
