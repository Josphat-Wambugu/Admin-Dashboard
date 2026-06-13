import {
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { LucideIcon } from "lucide-react";
import type { PageProps, BadgeType, TransactionStatus } from "../types";
import { Card, Badge } from "../components/ui";
import { revData, txns, traffic } from "../data/mockData";

interface StatCard {
  title: string;
  val: string;
  chg: number;
  Icon: LucideIcon;
  clr: string;
}

function statusBadgeType(status: TransactionStatus): BadgeType {
  if (status === "completed") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

export function OverviewPage({ t }: PageProps) {
  const fmt = (v: number) => `$${(v / 1000).toFixed(1)}k`;

  const stats: StatCard[] = [
    { title: "Total Revenue", val: "$102.3k", chg: 12.5, Icon: DollarSign, clr: t.accent },
    { title: "Active Users", val: "48,291", chg: 8.1, Icon: Users, clr: t.success },
    { title: "Total Orders", val: "12,847", chg: -2.3, Icon: ShoppingCart, clr: t.warning },
    { title: "Conversion Rate", val: "3.24%", chg: 4.7, Icon: Target, clr: t.info },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {stats.map(({ title, val, chg, Icon, clr }) => (
          <Card t={t} key={title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <p style={{ color: t.textSec, fontSize: 12.5, margin: "0 0 4px" }}>{title}</p>
                <p style={{ color: t.text, fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>{val}</p>
              </div>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: clr + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color={clr} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {chg >= 0 ? <ArrowUpRight size={15} color={t.success} /> : <ArrowDownRight size={15} color={t.danger} />}
              <span style={{ color: chg >= 0 ? t.success : t.danger, fontSize: 12.5, fontWeight: 600 }}>
                {chg >= 0 ? "+" : ""}
                {chg}%
              </span>
              <span style={{ color: t.textMuted, fontSize: 12 }}>vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <Card t={t}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: 0 }}>Revenue Overview</h3>
            <p style={{ color: t.textSec, fontSize: 12.5, margin: "3px 0 0" }}>Revenue vs Expenses — 2024</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["1W", "1M", "3M", "1Y"].map((l, i) => (
              <button
                key={l}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  background: i === 3 ? t.accentDim : "transparent",
                  color: i === 3 ? t.accent : t.textSec,
                  border: `1px solid ${i === 3 ? t.accent + "50" : t.border}`,
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.accent} stopOpacity={0.3} />
                <stop offset="100%" stopColor={t.accent} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.danger} stopOpacity={0.2} />
                <stop offset="100%" stopColor={t.danger} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: t.textMuted, fontSize: 11.5 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: t.textMuted, fontSize: 11.5 }} axisLine={false} tickLine={false} tickFormatter={fmt} width={50} />
            <Tooltip
              contentStyle={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13 }}
              labelStyle={{ color: t.text, fontWeight: 600 }}
              formatter={(v: number, n: string) => [`$${v.toLocaleString()}`, n]}
            />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke={t.accent} strokeWidth={2} fill="url(#gRev)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke={t.danger} strokeWidth={2} fill="url(#gExp)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Transactions + Traffic */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: 14 }}>
        <Card t={t}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: 0 }}>Recent Transactions</h3>
            <button style={{ background: "none", border: "none", color: t.accent, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
              View all →
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Transaction", "Category", "Amount", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    style={{
                      color: t.textMuted,
                      fontSize: 11,
                      fontWeight: 600,
                      textAlign: "left",
                      padding: "0 0 10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {txns.map((tx) => (
                <tr key={tx.id} style={{ borderTop: `1px solid ${t.border}` }}>
                  <td style={{ padding: "11px 0" }}>
                    <p style={{ color: t.text, fontSize: 13, fontWeight: 500, margin: 0 }}>{tx.name}</p>
                    <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{tx.id}</p>
                  </td>
                  <td style={{ padding: "11px 0" }}>
                    <span style={{ color: t.textSec, fontSize: 13 }}>{tx.cat}</span>
                  </td>
                  <td style={{ padding: "11px 0" }}>
                    <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>${tx.amount.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: "11px 0" }}>
                    <Badge label={tx.status} type={statusBadgeType(tx.status)} t={t} />
                  </td>
                  <td style={{ padding: "11px 0" }}>
                    <span style={{ color: t.textSec, fontSize: 12.5 }}>{tx.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card t={t}>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={traffic} cx="50%" cy="50%" innerRadius={46} outerRadius={68} paddingAngle={3} dataKey="value">
                {traffic.map((_, i) => (
                  <Cell key={i} fill={t.chart[i % t.chart.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
            {traffic.map((d, i) => {
              const tot = traffic.reduce((s, x) => s + x.value, 0);
              return (
                <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: t.chart[i % t.chart.length] }} />
                    <span style={{ color: t.textSec, fontSize: 12.5 }}>{d.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ color: t.textMuted, fontSize: 12 }}>{d.value.toLocaleString()}</span>
                    <span style={{ color: t.text, fontSize: 12.5, fontWeight: 600, width: 30, textAlign: "right" }}>
                      {Math.round((d.value / tot) * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
