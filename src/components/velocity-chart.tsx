"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface VelocityDay {
  date: string;
  created: number;
  resolved: number;
}

interface VelocityChartProps {
  data: VelocityDay[];
}

export default function VelocityChart({ data }: VelocityChartProps) {
  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
    } catch {
      return tickItem;
    }
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom:0 }}>
          <defs>
            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            stroke="#94a3b8" 
            fontSize={11}
            tickLine={false}
            dy={10}
          />
          
          <YAxis 
            stroke="#94a3b8" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            allowDecimals={false}
          />
          
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)" }}
            labelStyle={{ fontSize: "11px", fontWeight: "600", color: "#64748b" }}
            itemStyle={{ fontSize: "12px" }}
            labelFormatter={(label) => formatXAxis(label as string)}
          />
          
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", paddingBottom: "20px", marginTop: "-10px" }}
          />
          
          {/* Incoming Volumetric Track */}
          <Area
            name="Incoming Volume"
            type="monotone"
            dataKey="created"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCreated)"
          />

          {/* Team Resolution Productivity Track */}
          <Area
            name="Resolved Volume"
            type="monotone"
            dataKey="resolved"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorResolved)"
          />  
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}