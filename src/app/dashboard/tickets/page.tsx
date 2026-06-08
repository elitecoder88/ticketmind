import { prisma } from "@/lib/db";
import { Plus, AlertCircle, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default async function TicketListPage() {

  const tickets = await prisma.ticket.findMany({
    where: {
      organizationId: "org-test-1", // hard coded for now
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tickets</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, triage, and track customer issues for your organization. ({tickets.length} total)
          </p>
        </div>

        {/* Button Linking to the new form page */}
        <Link href="/dashboard/tickets/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 shadow-sm px-4 h-10">
            <Plus className="w-4 h-4"/>
            New Ticket
          </Button>
        </Link>
      </div>

      {/* Main Container */}
      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl p-16 text-center bg-white shadow-sm">
          <div className="p-3 bg-slate-50 rounded-full text-slate-400 mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No tickets logged</h3>
          <p className="text-sm text-slate-500 max-w-xs mt-1">
            Get started by manually filing a ticket or connecting an external pipeline.
          </p>
          <Link href="/dashboard/tickets/new" className="mt-4">
            <Button variant="outline" size="sm">Create your first ticket</Button>
          </Link>
        </div>
      ): (
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Customer & Subject</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-6 text-right">Opened</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">

                    <td className="py-4 px-6 max-w-md"> 
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {ticket.subject}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-medium text-slate-600">{ticket.customerName}</span>
                          <span>•</span>
                          <span className="truncate">{ticket.customerEmail}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge status={ticket.status} />
                    </td>

                    {/* Priority Column */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <PriorityBadge priority={ticket.priority} />
                    </td>

                    {/* Date/Time Column */}
                    <td className="py-4 px-6 text-right text-xs text-slate-400 whitespace-nowrap">
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"       
                      })}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );

}