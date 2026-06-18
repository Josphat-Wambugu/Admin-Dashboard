import {
  DollarSign,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PageProps, BadgeType, TransactionStatus } from "../types";
import { Card, Badge } from "../components/ui";
import { txns } from "../data/mockData";

interface StatCard {
  title: string;
  val: string;
  Icon: LucideIcon;
  clr: string;
  sub: string;
}

function statusBadgeType(status: TransactionStatus): BadgeType {
  if (status === "completed") return "success";
  if (status === "pending") return "warning";
  return "danger";
}

export function TransactionsPage({ t }: PageProps) {
  const totalVolume = txns.reduce((sum, tx) => sum + tx.amount, 0);
  const completed = txns.filter((tx) => tx.status === "completed").length;
  const pending = txns.filter((tx) => tx.status === "pending").length;
  const failed = txns.filter((tx) => tx.status === "failed").length;

  const stats: StatCard[] = [
    {
      title: "Total Volume",
      val: `$${totalVolume.toLocaleString()}`,
      Icon: DollarSign,
      clr: t.accent,
      sub: `${txns.length} total transactions`,
    },
    {
      title: "Completed",
      val: `${completed}`,
      Icon: CheckCircle2,
      clr: t.success,
      sub: "Successful payments",
    },
    {
      title: "Pending",
      val: `${pending}`,
      Icon: Clock3,
      clr: t.warning,
      sub: "Awaiting confirmation",
    },
    {
      title: "Failed",
      val: `${failed}`,
      Icon: XCircle,
      clr: t.danger,
      sub: "Rejected or declined",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {stats.map(({ title, val, Icon, clr, sub }) => (
          <Card t={t} key={title}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <p style={{ color: t.textSec, fontSize: 12.5, margin: "0 0 5px" }}>{title}</p>
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
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ArrowUpRight size={14} color={t.success} />
              <span style={{ color: t.textMuted, fontSize: 12 }}>{sub}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card t={t}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: 0 }}>All Transactions</h3>
            <p style={{ color: t.textMuted, fontSize: 12.5, margin: "3px 0 0" }}>
              {txns.length} records in the latest period
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {['Transaction', 'Category', 'Amount', 'Status', 'Date'].map((h) => (
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
                  <td style={{ padding: "12px 0" }}>
                    <p style={{ color: t.text, fontSize: 13, fontWeight: 500, margin: 0 }}>{tx.name}</p>
                    <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{tx.id}</p>
                  </td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ color: t.textSec, fontSize: 13 }}>{tx.cat}</span>
                  </td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>${tx.amount.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: "12px 0" }}>
                    <Badge label={tx.status} type={statusBadgeType(tx.status)} t={t} />
                  </td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ color: t.textSec, fontSize: 12.5 }}>{tx.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
