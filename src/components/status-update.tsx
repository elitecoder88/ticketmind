"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StatusUpdate({ ticketId, currentStatus }: { ticketId: string; currentStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setStatus(newStatus);

    // Should we not put the setStatus inside the try since it will be after fetching the data?
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error(error); // Write a message not just error
      setStatus(currentStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select 
      value={status} 
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={isUpdating}
      className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer disabled:opacity-50"
    >
      <option value="OPEN">Open</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="RESOLVED">Resolved</option>
      <option value="CLOSED">Closed</option>
    </select>
  );
}