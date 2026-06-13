import { useState } from "react";
import { MoreHorizontal, Clock, Plus } from "lucide-react";
import type { PageProps, BadgeType, ProjectItem } from "../types";
import { Badge, Avt, Prog, PillButton, Button } from "../components/ui";
import { PROJECTS } from "../data/mockData";

type FilterId = "All" | ProjectItem["status"];

const FILTERS: FilterId[] = ["All", "In Progress", "Review", "Planning"];

function priorityBadgeType(p: ProjectItem["priority"]): BadgeType {
  const map: Record<ProjectItem["priority"], BadgeType> = {
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "success",
  };
  return map[p] || "info";
}

function statusBadgeType(s: ProjectItem["status"]): BadgeType {
  if (s === "Review") return "warning";
  if (s === "Planning") return "info";
  return "accent";
}

export function ProjectsPage({ t }: PageProps) {
  const [filter, setFilter] = useState<FilterId>("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {FILTERS.map((f) => (
            <PillButton key={f} t={t} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
        <Button t={t} variant="primary" icon={<Plus size={14} />}>
          New Project
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {shown.map((p) => (
          <div
            key={p.id}
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: 18,
              borderTop: `3px solid ${p.color}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <h3 style={{ color: t.text, fontSize: 13.5, fontWeight: 700, margin: "0 0 5px" }}>{p.name}</h3>
                <Badge label={p.priority} type={priorityBadgeType(p.priority)} t={t} />
              </div>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: t.textMuted, padding: 0 }}>
                <MoreHorizontal size={16} />
              </button>
            </div>
            <p style={{ color: t.textSec, fontSize: 12.5, lineHeight: 1.55, margin: "10px 0 14px" }}>{p.desc}</p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ color: t.textMuted, fontSize: 12 }}>Progress</span>
                <span style={{ color: t.text, fontSize: 12, fontWeight: 600 }}>{p.prog}%</span>
              </div>
              <Prog val={p.prog} color={p.color} t={t} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex" }}>
                {p.team.map((m, i) => (
                  <div key={m} style={{ marginLeft: i > 0 ? -7 : 0 }}>
                    <Avt ini={m} sz={24} color={t.chart[i % t.chart.length]} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: t.textMuted }}>
                <Clock size={12} />
                <span style={{ fontSize: 12 }}>{p.due}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", borderTop: `1px solid ${t.border}` }}>
              <span style={{ color: t.textMuted, fontSize: 12 }}>
                {p.done}/{p.total} tasks
              </span>
              <Badge label={p.status} type={statusBadgeType(p.status)} t={t} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
