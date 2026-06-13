import { useState } from "react";
import { Search } from "lucide-react";
import type { PageProps } from "../types";
import { Avt, SearchInput, Button } from "../components/ui";
import { MESSAGES } from "../data/mockData";

export function MessagesPage({ t }: PageProps) {
  const [active, setActive] = useState(0);

  const body =
    "Hi team, " +
    MESSAGES[active].prev +
    " Convallis aenean et tortor at risus viverra adipiscing at in. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Nullam vehicula ipsum a arcu cursus. Tempus urna et pharetra pharetra massa ultricies mi. Ut morbi tincidunt augue interdum velit euismod in pellentesque.";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "310px 1fr",
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        overflow: "hidden",
        minHeight: 520,
      }}
    >
      {/* Message list */}
      <div style={{ borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 14, borderBottom: `1px solid ${t.border}` }}>
          <SearchInput t={t} placeholder="Search messages…" icon={<Search size={13} color={t.textMuted} />} />
        </div>
        {MESSAGES.map((m, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "13px 16px",
              cursor: "pointer",
              borderBottom: `1px solid ${t.border}`,
              background: active === i ? t.accentDim : m.unread ? t.surface2 : "transparent",
              borderLeft: `3px solid ${active === i ? t.accent : "transparent"}`,
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <Avt ini={m.ini} sz={36} color={t.chart[i % t.chart.length]} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ color: t.text, fontSize: 13, fontWeight: m.unread ? 700 : 500 }}>{m.from}</span>
                  <span style={{ color: t.textMuted, fontSize: 11 }}>{m.time}</span>
                </div>
                <p
                  style={{
                    color: active === i ? t.accent : t.textSec,
                    fontSize: 12.5,
                    fontWeight: m.unread ? 600 : 400,
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.sub}
                </p>
                <p
                  style={{
                    color: t.textMuted,
                    fontSize: 12,
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.prev}
                </p>
              </div>
              {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, flexShrink: 0, marginTop: 4 }} />}
            </div>
          </div>
        ))}
      </div>

      {/* Message detail */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <Avt ini={MESSAGES[active].ini} sz={40} color={t.chart[active % t.chart.length]} />
          <div>
            <p style={{ color: t.text, fontWeight: 700, fontSize: 15, margin: 0 }}>{MESSAGES[active].from}</p>
            <p style={{ color: t.textMuted, fontSize: 12, margin: 0 }}>
              {MESSAGES[active].sub} · {MESSAGES[active].time}
            </p>
          </div>
        </div>
        <div style={{ flex: 1, padding: 22, overflowY: "auto" }}>
          <div style={{ background: t.surface2, borderRadius: 12, padding: 18, maxWidth: 560 }}>
            <p style={{ color: t.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        </div>
        <div style={{ padding: "14px 22px", borderTop: `1px solid ${t.border}` }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 10,
              padding: "9px 14px",
            }}
          >
            <input
              placeholder="Write a reply…"
              style={{ border: "none", background: "transparent", outline: "none", color: t.text, fontSize: 13, flex: 1 }}
            />
            <Button t={t} variant="primary" style={{ padding: "6px 14px" }}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
