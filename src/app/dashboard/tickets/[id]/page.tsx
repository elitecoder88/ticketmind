import { prisma } from "@/lib/db";
import Link from "next/link";
import StatusUpdate from "@/components/status-update";
import PriorityBadge from "@/components/priority-badge";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TicketDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
  });

  if (!ticket) {
    console.log(`Ticket ID not found in Neon database: ${id}`);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">

      <div>
        <Link 
          href="/dashboard/tickets"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Tickets
        </Link>
      </div>

      <div className="border-b border-slate-100 pb-6 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {ticket.subject}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="font-medium text-slate-700">{ticket.customerName}</span>
          <span>•</span>
          <span>{ticket.customerEmail}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Side: Ticket Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Message Description
            </h2>
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {ticket.body}
            </p>
          </div>

          {/* AI Suggested Response */}
          {ticket.aiSuggestion && (
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-xl border border-blue-200/40 shadow-sm p-6">
              <h2 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                ✨ AI Suggested Response
              </h2>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {ticket.aiSuggestion}
              </p>
            </div>
          )}

        </div>

        {/* Right Side: Metadata Sidebar */}
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 space-y-6">
          <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Ticket Properties
          </h3>

          {/* Status Metadata Field */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Status
            </span>
            <div className="text-sm font-medium text-slate-800">
              <StatusUpdate ticketId={ticket.id} currentStatus={ticket.status} />
            </div>
          </div>

          {/* Priority Metadata Field */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Priority
            </span>
            <div className="text-sm font-medium text-slate-800">
              <PriorityBadge priority={ticket.priority} />
            </div>
          </div>

          {/* AI Category Metadata Field */}
          {ticket.aiCategory && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                AI Category
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {ticket.aiCategory}
              </span>
            </div>
          )}

          {/* AI Sentiment Metadata Field */}
          {ticket.aiSentiment && (
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                AI Sentiment
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                ticket.aiSentiment === "POSITIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                ticket.aiSentiment === "NEUTRAL" ? "bg-slate-100 text-slate-700" :
                ticket.aiSentiment === "NEGATIVE" ? "bg-orange-50 text-orange-700 border border-orange-200" :
                "bg-red-50 text-red-700 border border-red-200 animate-pulse"
              }`}>
                {ticket.aiSentiment}
              </span>
            </div>
          )}

          {/* Date Field */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
              Opened On
            </span>
            <span className="text-sm text-slate-600">
              {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

      </div>
    </div>
  )

  
}