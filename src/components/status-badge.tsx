function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    OPEN: "bg-blue-50 text-blue-700 border border-blue-200",
    IN_PROGRESS: "bg-amber-50 text-amber-800 border border-amber-200",
    RESOLVED: "bg-green-50 text-green-700 border border-green-200/60",
    CLOSED: "bg-slate-100 text-slate-500 border border-slate-200/60",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.OPEN}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default StatusBadge;