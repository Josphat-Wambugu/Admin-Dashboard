import { Activity, Shield, Zap, Globe, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { LucideIcon } from "lucide-react";
import type { PageProps } from "../types";
import { Card, Prog } from "../components/ui";
import { perfData, growthData } from "../data/mockData";

interface MetricRow {
  label: string;
  val: string;
  pct: number;
  clr: string;
}

interface HealthCard {
  label: string;
  val: string;
  chg: number;
  positive: boolean;
  Icon: LucideIcon;
  clr: string;
}

export function AnalyticsPage({ t }: PageProps) {
  const metrics: MetricRow[] = [
    { label: "Avg. Session Duration", val: "4m 32s", pct: 72, clr: t.accent },
    { label: "Bounce Rate", val: "28.4%", pct: 28, clr: t.danger },
    { label: "Goal Completion Rate", val: "67.8%", pct: 68, clr: t.success },
    { label: "Pages per Session", val: "3.7", pct: 61, clr: t.warning },
    { label: "Return Visitor Rate", val: "52.1%", pct: 52, clr: t.info },
  ];

  const healthCards: HealthCard[] = [
    { label: "Page Load Time", val: "1.24s", chg: -8.2, positive: true, Icon: Activity, clr: t.accent },
    { label: "Error Rate", val: "0.12%", chg: -15, positive: true, Icon: Shield, clr: t.success },
    { label: "Uptime", val: "99.98%", chg: 0.02, positive: true, Icon: Zap, clr: t.info },
    { label: "API Latency", val: "48ms", chg: 3.1, positive: false, Icon: Globe, clr: t.warning },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Weekly performance */}
      <Card t={t}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: 0 }}>Weekly Performance</h3>
            <p style={{ color: t.textSec, fontSize: 12.5, margin: "3px 0 0" }}>Sessions, pageviews and conversions this week</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Sessions", val: "35,600", clr: t.accent },
              { label: "Pageviews", val: "71,800", clr: t.success },
              { label: "Conversions", val: "1,555", clr: t.warning },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: m.clr }} />
                  <span style={{ color: t.textMuted, fontSize: 11.5 }}>{m.label}</span>
                </div>
                <p style={{ color: t.text, fontWeight: 700, fontSize: 16, margin: "2px 0 0" }}>{m.val}</p>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={perfData}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
            <XAxis dataKey="day" tick={{ fill: t.textMuted, fontSize: 11.5 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: t.textMuted, fontSize: 11.5 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`)}
              width={44}
            />
            <Tooltip
              contentStyle={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13 }}
              labelStyle={{ color: t.text, fontWeight: 600 }}
            />
            <Line type="monotone" dataKey="sessions" name="Sessions" stroke={t.accent} strokeWidth={2.5} dot={{ r: 4, fill: t.accent }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="pageviews" name="Pageviews" stroke={t.success} strokeWidth={2.5} dot={{ r: 4, fill: t.success }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="conv" name="Conversions" stroke={t.warning} strokeWidth={2.5} dot={{ r: 4, fill: t.warning }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Growth + Key metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card t={t}>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>User Growth</h3>
          <p style={{ color: t.textSec, fontSize: 12.5, margin: "0 0 18px" }}>New vs returning users by week</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={growthData} barSize={14} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
              <XAxis dataKey="week" tick={{ fill: t.textMuted, fontSize: 11.5 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: t.textMuted, fontSize: 11.5 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`)}
                width={44}
              />
              <Tooltip
                contentStyle={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13 }}
                labelStyle={{ color: t.text, fontWeight: 600 }}
              />
              <Bar dataKey="newU" name="New Users" fill={t.accent} radius={[4, 4, 0, 0]} />
              <Bar dataKey="ret" name="Returning" fill={t.info} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card t={t}>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>Key Metrics</h3>
          <p style={{ color: t.textSec, fontSize: 12.5, margin: "0 0 20px" }}>Performance indicators at a glance</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {metrics.map((m) => (
              <div key={m.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: t.textSec, fontSize: 12.5 }}>{m.label}</span>
                  <span style={{ color: t.text, fontSize: 12.5, fontWeight: 600 }}>{m.val}</span>
                </div>
                <Prog val={m.pct} color={m.clr} t={t} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System health cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {healthCards.map(({ label, val, chg, positive, Icon, clr }) => (
          <Card t={t} key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: t.textSec, fontSize: 12.5 }}>{label}</span>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: clr + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={16} color={clr} />
              </div>
            </div>
            <p style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.3px" }}>{val}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowUpRight size={14} color={positive ? t.success : t.danger} />
              <span style={{ color: positive ? t.success : t.danger, fontSize: 12, fontWeight: 600 }}>
                {chg > 0 ? "+" : ""}
                {chg}%
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
