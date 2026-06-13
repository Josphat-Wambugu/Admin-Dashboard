import { Plus } from "lucide-react";
import type { PageProps, CalendarEvent, UpcomingEvent } from "../types";
import { Card } from "../components/ui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarPage({ t }: PageProps) {
  const evts: Record<number, CalendarEvent[]> = {
    5: [{ title: "Team Standup", clr: t.accent }],
    9: [{ title: "Product Review", clr: t.success }],
    12: [
      { title: "API Launch", clr: t.danger },
      { title: "Mktg Sync", clr: t.warning },
    ],
    17: [{ title: "Security Audit", clr: t.danger }],
    20: [{ title: "Q1 Planning", clr: t.accent }],
    25: [{ title: "Holiday Party", clr: t.success }],
    28: [{ title: "Year End Review", clr: t.info }],
  };

  const upcoming: UpcomingEvent[] = [
    { title: "Team Standup", date: "Dec 5", time: "10:00 AM", clr: t.accent },
    { title: "Product Review", date: "Dec 9", time: "2:00 PM", clr: t.success },
    { title: "API Launch", date: "Dec 12", time: "9:00 AM", clr: t.danger },
    { title: "Marketing Sync", date: "Dec 12", time: "3:00 PM", clr: t.warning },
    { title: "Security Audit", date: "Dec 17", time: "11:00 AM", clr: t.danger },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 14 }}>
      <Card t={t}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 16, margin: 0 }}>December 2024</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {["← Prev", "Next →"].map((l) => (
              <button
                key={l}
                style={{
                  padding: "5px 12px",
                  borderRadius: 7,
                  background: t.surface2,
                  border: `1px solid ${t.border}`,
                  color: t.textSec,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 6 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ textAlign: "center", color: t.textMuted, fontSize: 11.5, fontWeight: 600, padding: "5px 0" }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const es = evts[day];
            const isToday = day === 9;
            return (
              <div
                key={day}
                style={{
                  minHeight: 58,
                  padding: 4,
                  borderRadius: 7,
                  background: isToday ? t.accentDim : "transparent",
                  border: `1px solid ${isToday ? t.accent + "50" : t.border}`,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isToday ? t.accent : "transparent",
                    color: isToday ? "#fff" : t.textSec,
                    fontSize: 12.5,
                    fontWeight: isToday ? 700 : 400,
                  }}
                >
                  {day}
                </span>
                {es &&
                  es.map((ev, ei) => (
                    <div
                      key={ei}
                      style={{
                        background: ev.clr + "25",
                        color: ev.clr,
                        fontSize: 9.5,
                        fontWeight: 600,
                        padding: "2px 4px",
                        borderRadius: 3,
                        marginTop: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {ev.title}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </Card>

      <Card t={t} style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ color: t.text, fontWeight: 700, fontSize: 14, margin: 0 }}>Upcoming Events</h3>
          <button
            style={{
              background: t.accent,
              border: "none",
              borderRadius: 6,
              color: "#fff",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Plus size={13} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.map((ev, i) => (
            <div key={i} style={{ padding: "9px 10px", borderRadius: 8, background: t.surface2, borderLeft: `3px solid ${ev.clr}` }}>
              <p style={{ color: t.text, fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}>{ev.title}</p>
              <p style={{ color: t.textMuted, fontSize: 11.5, margin: 0 }}>
                {ev.date} · {ev.time}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
