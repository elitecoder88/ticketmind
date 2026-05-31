export default function DashboardPage() {
  const stats = [
    { label:"Total Tickets", value: "147", trend: 8, trendLabel: "vs last week", isPositiveGood: true },
    { label:"Open Tickets", value: "23", trend: 8, trendLabel: "vs last week", isPositiveGood: false },
    { label:"Resolved Today", value: "12", trend: 15, trendLabel: "vs yesterday", isPositiveGood: true },
    { label:"Avg Response Time", value: "24m", trend: -10, trendLabel: "vs last week", isPositiveGood: false },
  ];

  const tickets = [
    { id: 1, subject: "Cannot access my account after password reset", senderName: "Sarah Chen", sentiment: "NEGATIVE", status: "OPEN" },
    { id: 2, subject: "How do I upgrade my subscription plan?", senderName: "Marcus Johnson", sentiment: "NEUTRAL", status: "IN_PROGRESS" },
    { id: 3, subject: "URGENT: Production API returning 500 errors", senderName: "Alex Kim", sentiment: "URGENT", status: "OPEN" },
    { id: 4, subject: "Great experience with your support team!", senderName: "Priya Patel", sentiment: "POSITIVE", status: "RESOLVED" },
    { id: 5, subject: "Integration with Slack not syncing messages", senderName: "Tomoko Sato", sentiment: "NEGATIVE", status: "IN_PROGRESS" },
  ];

  const categories = [
    { name: "Account Access", count: 34, trend: 12 },
    { name: "Billing", count: 28, trend: -3 },
    { name: "Technical Issue", count: 22, trend: 8 },
    { name: "Feature Request", count: 18, trend: 5 },
    { name: "Onboarding", count: 12, trend: -6 },
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
    RESOLVED: "bg-slate-100 text-slate-500 border border-slate-200/60",
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-gray-500">Monitor your support pipeline at a glance.</p>

      {/* Stat cards grid */}
      <div className="grid grid-cols-4 gap-6 mt-6">
          {/* All 4 Card  */}
          {stats.map((stat) => {
            const isGood = stat.isPositiveGood ? stat.trend >= 0 : stat.trend <= 0;

            return (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-50 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="mt-2 font-medium text-xs flex items-center gap-1">
                  <span className={isGood ? "text-emerald-600" : "text-red-500"}>
                    {stat.trend >= 0 ? "↑" : "↓"} {Math.abs(stat.trend)}%
                  </span>
                  <span className="text-gray-400">{stat.trendLabel}</span>
                </p>
              </div>
            );
          })}
      </div>

      {/* Recent Tickets & Trending Categories grid */}
      <div className="grid grid-cols-3 gap-6 mt-6 items-start">

        {/* Recent Tickets */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-50">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold">Recent Ticket</h2>
          </div>
          {tickets.map((ticket) => {
            return (
              <div key={ticket.id} className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{ticket.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{ticket.senderName}</p>
                </div>

                <div className="px-2 py-1 rounded-full flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${sentimentColors[ticket.sentiment]}`}>
                    {ticket.sentiment}
                  </span>
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

          {categories.map((category) => {
            return (
              <div key={category.name} className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
                <p>{category.name}</p>

                <div className="text-right">
                  <p className="font-bold">{category.count}</p>
                  <p className="text-xs">
                    <span className={category.trend >= 0 ? "text-emerald-600" : "text-red-500"}>
                      {category.trend >= 0 ? "↑" : "↓"} {Math.abs(category.trend)}%
                    </span>
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}