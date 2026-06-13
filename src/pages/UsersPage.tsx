import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import type { PageProps, BadgeType, UserStatus } from "../types";
import { Badge, Avt, Button, SearchInput } from "../components/ui";
import { USERS } from "../data/mockData";

interface SummaryCard {
  label: string;
  val: string;
  chg: string;
  pos: boolean;
}

function roleBadgeType(role: string): BadgeType {
  const map: Record<string, BadgeType> = {
    Admin: "danger",
    Developer: "accent",
    Designer: "success",
    Manager: "warning",
    Analyst: "info",
  };
  return map[role] || "info";
}

function statusDotColor(status: UserStatus, t: { success: string; textMuted: string; warning: string }): string {
  if (status === "Active") return t.success;
  if (status === "Inactive") return t.textMuted;
  return t.warning;
}

export function UsersPage({ t }: PageProps) {
  const [q, setQ] = useState("");

  const filtered = USERS.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
  );

  const summary: SummaryCard[] = [
    { label: "Total Users", val: "48,291", chg: "+8.1%", pos: true },
    { label: "Active", val: "41,204", chg: "+5.3%", pos: true },
    { label: "Inactive", val: "5,832", chg: "-2.1%", pos: false },
    { label: "Pending", val: "1,255", chg: "+12.7%", pos: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {summary.map((c) => (
          <div key={c.label} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ color: t.textSec, fontSize: 12, margin: "0 0 6px" }}>{c.label}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <p style={{ color: t.text, fontSize: 22, fontWeight: 700, margin: 0 }}>{c.val}</p>
              <p style={{ color: c.pos ? t.success : t.danger, fontSize: 12.5, fontWeight: 600, margin: 0 }}>{c.chg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", display: "flex", gap: 10, borderBottom: `1px solid ${t.border}`, alignItems: "center" }}>
          <SearchInput
            t={t}
            value={q}
            onChange={setQ}
            placeholder="Search users…"
            icon={<Search size={14} color={t.textMuted} />}
            style={{ flex: 1 }}
          />
          <Button t={t} variant="secondary" icon={<Filter size={13} />}>
            Filter
          </Button>
          <Button t={t} variant="primary" icon={<Plus size={13} />}>
            Add User
          </Button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: t.surface2 }}>
              {["User", "Role", "Status", "Location", "Joined", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 18px",
                    textAlign: "left",
                    color: t.textMuted,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderTop: `1px solid ${t.border}` }}>
                <td style={{ padding: "11px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avt ini={u.ini} sz={32} color={t.chart[i % t.chart.length]} />
                    <div>
                      <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: 0 }}>{u.name}</p>
                      <p style={{ color: t.textMuted, fontSize: 12, margin: 0 }}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "11px 18px" }}>
                  <Badge label={u.role} type={roleBadgeType(u.role)} t={t} />
                </td>
                <td style={{ padding: "11px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusDotColor(u.status, t) }} />
                    <span style={{ color: t.textSec, fontSize: 13 }}>{u.status}</span>
                  </div>
                </td>
                <td style={{ padding: "11px 18px" }}>
                  <span style={{ color: t.textSec, fontSize: 13 }}>{u.loc}</span>
                </td>
                <td style={{ padding: "11px 18px" }}>
                  <span style={{ color: t.textSec, fontSize: 13 }}>{u.joined}</span>
                </td>
                <td style={{ padding: "11px 18px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button t={t} variant="ghost" style={{ background: t.accentDim, color: t.accent, padding: "4px 10px", fontSize: 12 }}>
                      Edit
                    </Button>
                    <Button t={t} variant="danger" style={{ padding: "4px 10px", fontSize: 12 }}>
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: "11px 18px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: t.textMuted, fontSize: 12.5 }}>
            Showing {filtered.length} of {USERS.length} users
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, "…", 12].map((p, i) => (
              <button
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  fontSize: 12,
                  border: `1px solid ${i === 0 ? t.accent : t.border}`,
                  background: i === 0 ? t.accentDim : "transparent",
                  color: i === 0 ? t.accent : t.textSec,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
