"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SentimentData {
  name: string;
  value: number;
  fill: string;
}

interface SentimentChartProps {
  data: SentimentData[];
}

const COLORS: Record<string, string> = {
  POSITIVE: "#10b981",
  NEUTRAL: "#94a3b8",
  NEGATIVE: "#f97316",
  URGENT: "#ef4444",
}

export default function SentimentChart({ data }: SentimentChartProps) {
  // Check if database is entirely empty
  if (!data || data.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-sm text-slate-400">
        No sentiment insights recorded yet.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            itemStyle={{ fontSize: "12px", color: "#1e293b" }}
          />
          <Legend 
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}