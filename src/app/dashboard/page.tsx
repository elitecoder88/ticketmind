import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });  
  
  const totalTickets = await prisma.ticket.count();
  const openTickets = await prisma.ticket.count({
    where: { status: "OPEN" },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const resolvedToday = await prisma.ticket.count({
    where: { resolvedAt: { gte: startOfToday } },
  });

  const resolvedTickets = await prisma.ticket.findMany({
    where: { resolvedAt: { not: null } },
    select: { createdAt: true, resolvedAt: true },
  });

  const avgResolutionTime = resolvedTickets.length > 0
  ? resolvedTickets.reduce((sum, ticket) => {
      const diff = ticket.resolvedAt!.getTime() - ticket.createdAt.getTime();
      return sum + diff;
    }, 0) / resolvedTickets.length / (1000 * 60 * 60) // convert milliseconds to hours
  : 0.0;

  const categoryCounts = await prisma.ticket.groupBy({
    by: ["aiCategory"],
    _count: { id: true },
    where: { aiCategory: { not: null } },
  });


  const formatCategory = (raw: string) =>
    raw
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  const categoryData = categoryCounts
    .map((category) => ({
      name: formatCategory(category.aiCategory!),
      count: category._count.id,
    }))
    .sort((a, b) => b.count - a.count);

  const stats = [
    { label:"Total Tickets", value: totalTickets.toString() },
    { label:"Open Tickets", value: openTickets.toString() },
    { label:"Resolved Today", value: resolvedToday.toString() },
    { label:"Avg Resolution Time", value: avgResolutionTime.toFixed(1) + "h" },
  ];

  const sentimentColors: Record<string, string> = {
    POSITIVE: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    NEUTRAL: "bg-slate-100 text-slate-700",
    NEGATIVE: "bg-orange-50 text-orange-700 border border-orange-200",
    URGENT: "bg-red-50 text-red-700 border border-red-200 animate-pulse",
  };

  const statusColors: Record<string, string> = {
    OPEN: "bg-blue-50 text-blue-700 border border-blue-200",
    IN_PROGRESS: "bg-amber-50 text-amber-800 border border-amber-200",
    RESOLVED: "bg-green-50 text-green-700 border border-green-200/60",
    CLOSED: "bg-slate-100 text-slate-500 border border-slate-200/60",
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-gray-500">Monitor your support pipeline at a glance.</p>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* All 4 Card  */}
          {stats.map((stat) => {
  
            return (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
      </div>

      {/* Recent Tickets & Trending Categories grid */}
      <div className="grid grid-cols-1 gap-6 mt-6 items-start lg:grid-cols-3">

        {/* Recent Tickets */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-50 lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold">Recent Tickets</h2>
          </div>
          {tickets.map((ticket) => {
            return (
              <div key={ticket.id} className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{ticket.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{ticket.customerName}</p>
                </div>

                <div className="px-2 py-1 rounded-full flex gap-2">
                  {ticket.aiSentiment && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${sentimentColors[ticket.aiSentiment]}`}>
                      {ticket.aiSentiment}
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Trending Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-50">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold">Trending Categories</h2>
          </div>

          {categoryData.map((category) => {
            return (
              <div key={category.name} className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
                <p>{category.name}</p>
                <p className="font-bold">{category.count}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}