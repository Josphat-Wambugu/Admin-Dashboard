import { Search, HelpCircle, Zap, Users, Globe, BarChart2, Shield, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PageProps } from "../types";
import { Card, SearchInput, Button } from "../components/ui";

interface HelpCard {
  title: string;
  desc: string;
  Icon: LucideIcon;
  clr: string;
}

export function HelpPage({ t }: PageProps) {
  const cards: HelpCard[] = [
    { title: "Getting Started", desc: "Set up your workspace and configure your first dashboard", Icon: Zap, clr: t.accent },
    { title: "User Management", desc: "Add, invite and manage your team members and permissions", Icon: Users, clr: t.success },
    { title: "Integrations", desc: "Connect Nexus to your favourite tools and services", Icon: Globe, clr: t.info },
    { title: "Analytics & Reports", desc: "Understand your metrics and build custom reports", Icon: BarChart2, clr: t.warning },
    { title: "Security", desc: "Best practices for keeping your account and data safe", Icon: Shield, clr: t.danger },
    { title: "Billing & Plans", desc: "Manage your subscription, invoices and usage limits", Icon: DollarSign, clr: t.accent },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: t.accentDim, border: `1px solid ${t.accent}30`, borderRadius: 12, padding: "32px 28px", textAlign: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: t.accent + "20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <HelpCircle size={24} color={t.accent} />
        </div>
        <h2 style={{ color: t.text, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>How can we help?</h2>
        <p style={{ color: t.textSec, fontSize: 14, margin: "0 0 20px" }}>Search our knowledge base or browse topics below</p>
        <SearchInput
          t={t}
          placeholder="Search help articles…"
          icon={<Search size={15} color={t.textMuted} />}
          style={{ maxWidth: 400, margin: "0 auto", padding: "10px 16px", background: t.surface }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {cards.map(({ title, desc, Icon, clr }) => (
          <div key={title} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 18, cursor: "pointer", transition: "border-color 0.2s" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: clr + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Icon size={19} color={clr} />
            </div>
            <h4 style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: "0 0 5px" }}>{title}</h4>
            <p style={{ color: t.textSec, fontSize: 12.5, margin: 0, lineHeight: 1.55 }}>{desc}</p>
          </div>
        ))}
      </div>

      <Card t={t}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ color: t.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>Still need help?</h3>
            <p style={{ color: t.textSec, fontSize: 13, margin: 0 }}>Our support team is available 24/7 to assist you.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button t={t} variant="secondary" style={{ padding: "9px 18px", color: t.text, fontWeight: 500 }}>
              Browse Docs
            </Button>
            <Button t={t} variant="primary" style={{ padding: "9px 18px" }}>
              Contact Support
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
