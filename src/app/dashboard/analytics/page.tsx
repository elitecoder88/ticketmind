import { prisma } from "@/lib/db";
import { Clock, ShieldAlert, Inbox, CheckCircle } from "lucide-react";
import SentimentChart from "@/components/sentiment-chart";
import VelocityChart from "@/components/velocity-chart";

export default async function AnalyticsPage() {

  // SIMPLE COUNTS QUERIES
  const totalTickets = await prisma.ticket.count();
  const openTickets = await prisma.ticket.count({
    where: {
      status: "OPEN"
    },
  });
  const escalatedTickets = await prisma.ticket.count({
    where: {
      aiSentiment: { in: ["URGENT", "NEGATIVE"] },
    },
  });

  // FIND-MANY QUERIES
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const createdLast30Days = await prisma.ticket.findMany({
    select: { createdAt: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
  });

  const resolvedLast30Days = await prisma.ticket.findMany({
    select: { resolvedAt: true },
    where: { resolvedAt: {  gte: thirtyDaysAgo } },
  });

  const resolvedTickets = await prisma.ticket.findMany({
    where: { resolvedAt: { not: null } },
    select: { createdAt: true, resolvedAt: true },
  });

  // GROUPBY QUERIES
  const categoryCounts = await prisma.ticket.groupBy({
    by: ["aiCategory"],
    _count: { id: true },
    where: { aiCategory: { not: null } },
  });

  const sentimentCounts = await prisma.ticket.groupBy({
    by: ["aiSentiment"],
    _count: { id: true },
    where: { aiSentiment: { not: null } }
  });

  // TIME MATRIX & INSIGHT DERIVATION
  const skeleton30Days: { date: string; created: number; resolved: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().slice(0, 10);
    skeleton30Days.push({ date: dateString, created: 0, resolved: 0 });
  }

  for (const ticket of createdLast30Days) {
    const dateString = ticket.createdAt.toISOString().slice(0, 10);
    const entry = skeleton30Days.find((e) => e.date === dateString)
    if (entry) entry.created++;
  }

  for (const ticket of resolvedLast30Days) {
    const dateString = ticket.resolvedAt!.toISOString().slice(0, 10);
    const entry = skeleton30Days.find((e) => e.date === dateString);
    if (entry) entry.resolved++;
  }

  const COLORS: Record<string, string> = {
    POSITIVE: "#10b981",
    NEUTRAL: "#94a3b8",
    NEGATIVE: "#f97316",
    URGENT: "#ef4444",
  };

  const sentimentData = sentimentCounts.map((group) => ({
    name: group.aiSentiment!,
    value: group._count.id,
    fill: COLORS[group.aiSentiment!] || "#cbd5e1",
  }));

  const avgResolutionTime = resolvedTickets.length > 0
    ? resolvedTickets.reduce((sum, ticket) => {
        const diff = ticket.resolvedAt!.getTime() - ticket.createdAt.getTime();
        return sum + diff;
      }, 0) / resolvedTickets.length / (1000 * 60 * 60) // convert milliseconds to hours
    : 0;

  const escalationRate = totalTickets > 0
    ? Math.round((escalatedTickets / totalTickets ) * 100)
    : 0;

  const completedCount = resolvedTickets.length;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">

      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track performance, sentiment trends, and team velocity in real time. 
        </p>
      </div>

      {/* Responsive KPI Grid Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Card 1: Open Backlog */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Open Tickets
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {openTickets}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Average Resolution Speed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Avg Resolution Time
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {avgResolutionTime > 0 ? `${avgResolutionTime.toFixed(1)}h` : "0.0h"}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5"/>
          </div>
        </div>

        {/* Card 3: AI Escalation Rate */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              AI Escalation Rate
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {escalationRate}%
            </span>
          </div>
          <div className="p-3 rounded-lg bg-red-50 text-red-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Historical Completed Volume */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Resolved Tickets
            </span>
            <span className="text-2xl font-bold text-slate-900">
              {completedCount}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left Side: AI Category Breakdown Panel (Spans 2 colums) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Issues by Category</h3>
            <p className="text-xs text-slate-500 mt-0.5">Real-time distribution of ticket topics analyzed by AI.</p>
          </div>

          <div className="space-y-4" >
            {categoryCounts.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No AI categorized data available yet.</p>
            ) : (
              categoryCounts.map((group) => {
                const percentage = totalTickets > 0
                  ? Math.round((group._count.id / totalTickets) * 100)
                  : 0;

                return (
                  <div key={group.aiCategory} className="space-y-1.5">
                    {/* Label Row */}
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700 uppercase tracking-wide text-xs bg-slate-50 border border-slate-200/50 rounded px-2 py-0.5">
                        {group.aiCategory?.replace("_", " ")}
                      </span>
                      <span className="text-slate-500 text-xs font-semibold">
                        {group._count.id} {group._count.id === 1 ? 'ticket' : 'tickets'} ({percentage}%)
                      </span>
                    </div>

                    {/* Visual Progress Bar Track */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Recharts Donut Panel (Spans 1 column) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Customer Sentiment Pulse</h3>
            <p className="text-xs text-slate-500 mt-0.5">Live emotional composition calculated by AI analysis.</p>
          </div>

          <div className="flex-1 flex items-center justify-center pt-4">
            <SentimentChart data={sentimentData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Queue Velocity</h3>
          <p className="text-xs text-slate-500 mt-0.5">Comparing dynamic volume changes between daily incoming demand and system resolutions.</p>
        </div>
        <div className="pt-2">
          <VelocityChart data={skeleton30Days} />
        </div>
      </div>

    </div>
  );
}



