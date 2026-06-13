import { useState } from "react";
import type { CSSProperties } from "react";
import { User, Bell, Shield, Eye, Sun, Moon, Check } from "lucide-react";
import type { SettingsPageProps } from "../types";
import { Avt, Badge, Button, TabButton, ToggleSwitch } from "../components/ui";

type TabId = "profile" | "notifications" | "security" | "appearance";

interface TabConfig {
  id: TabId;
  label: string;
  Icon: typeof User;
}

const TABS: TabConfig[] = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "security", label: "Security", Icon: Shield },
  { id: "appearance", label: "Appearance", Icon: Eye },
];

interface ProfileField {
  l: string;
  v: string;
}

interface NotificationRow {
  label: string;
  desc: string;
  on: boolean;
}

const PROFILE_FIELDS: ProfileField[] = [
  { l: "Full Name", v: "Alice Johnson" },
  { l: "Email Address", v: "alice@techcorp.io" },
  { l: "Job Title", v: "Administrator" },
  { l: "Company", v: "TechCorp Inc." },
];

const NOTIFICATION_ROWS: NotificationRow[] = [
  { label: "New user signups", desc: "When a new user registers an account", on: true },
  { label: "Transaction alerts", desc: "Completed, pending, or failed transactions", on: true },
  { label: "Weekly digest", desc: "Summary of your workspace activity", on: false },
  { label: "Project updates", desc: "When project status or progress changes", on: true },
  { label: "Security alerts", desc: "Suspicious login attempts or data access", on: true },
  { label: "Marketing emails", desc: "Product news, updates and feature launches", on: false },
];

const ACCENT_COLORS = ["#7C6FF7", "#3FB950", "#58A6FF", "#F78C6F", "#F85149", "#D29922"];

const inputStyle = (t: SettingsPageProps["t"]): CSSProperties => ({
  width: "100%",
  padding: "8px 12px",
  borderRadius: 8,
  border: `1px solid ${t.border}`,
  background: t.surface2,
  color: t.text,
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
});

export function SettingsPage({ t, isDark, setIsDark }: SettingsPageProps) {
  const [tab, setTab] = useState<TabId>("profile");

  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, padding: "0 20px" }}>
        {TABS.map(({ id, label, Icon }) => (
          <TabButton key={id} t={t} label={label} icon={<Icon size={14} />} active={tab === id} onClick={() => setTab(id)} />
        ))}
      </div>

      <div style={{ padding: 28 }}>
        {tab === "profile" && (
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>Profile Settings</h3>
            <p style={{ color: t.textSec, fontSize: 13, margin: "0 0 22px" }}>Update your personal information and avatar</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
              <Avt ini="AJ" sz={68} color={t.accent} />
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <Button t={t} variant="ghost" style={{ background: t.accentDim, border: `1px solid ${t.accent}40`, padding: "7px 14px", fontWeight: 600 }}>
                    Change
                  </Button>
                  <Button t={t} variant="secondary" style={{ background: "transparent", padding: "7px 14px" }}>
                    Remove
                  </Button>
                </div>
                <p style={{ color: t.textMuted, fontSize: 12, margin: 0 }}>PNG, JPG. Max size 2MB.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {PROFILE_FIELDS.map((f) => (
                <div key={f.l}>
                  <label style={{ display: "block", color: t.textSec, fontSize: 12.5, fontWeight: 500, marginBottom: 5 }}>{f.l}</label>
                  <input defaultValue={f.v} style={inputStyle(t)} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", color: t.textSec, fontSize: 12.5, fontWeight: 500, marginBottom: 5 }}>Bio</label>
              <textarea
                defaultValue="Product leader with 8+ years in SaaS and enterprise software."
                rows={3}
                style={{ ...inputStyle(t), resize: "vertical", fontFamily: "inherit" }}
              />
            </div>
            <Button t={t} variant="primary" style={{ padding: "9px 22px", fontSize: 14 }}>
              Save Changes
            </Button>
          </div>
        )}

        {tab === "notifications" && (
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>Notification Preferences</h3>
            <p style={{ color: t.textSec, fontSize: 13, margin: "0 0 22px" }}>Choose what you get notified about</p>
            {NOTIFICATION_ROWS.map((n, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: i < NOTIFICATION_ROWS.length - 1 ? `1px solid ${t.border}` : "none",
                }}
              >
                <div>
                  <p style={{ color: t.text, fontSize: 13.5, fontWeight: 500, margin: "0 0 2px" }}>{n.label}</p>
                  <p style={{ color: t.textSec, fontSize: 12.5, margin: 0 }}>{n.desc}</p>
                </div>
                <ToggleSwitch t={t} on={n.on} />
              </div>
            ))}
          </div>
        )}

        {tab === "security" && (
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>Security Settings</h3>
            <p style={{ color: t.textSec, fontSize: 13, margin: "0 0 22px" }}>Manage your account security and authentication</p>
            <div style={{ background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 10, padding: 18, marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ color: t.text, fontSize: 14, fontWeight: 600, margin: "0 0 3px" }}>Two-Factor Authentication</h4>
                  <p style={{ color: t.textSec, fontSize: 12.5, margin: 0 }}>Add an extra layer of security to your account</p>
                </div>
                <Badge label="Not Enabled" type="warning" t={t} />
              </div>
              <Button t={t} variant="primary" style={{ marginTop: 14, padding: "8px 16px" }}>
                Enable 2FA
              </Button>
            </div>
            {["Current Password", "New Password", "Confirm New Password"].map((f) => (
              <div key={f} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: t.textSec, fontSize: 12.5, fontWeight: 500, marginBottom: 5 }}>{f}</label>
                <input type="password" placeholder="••••••••" style={inputStyle(t)} />
              </div>
            ))}
            <Button t={t} variant="primary" style={{ padding: "9px 22px", fontSize: 14 }}>
              Update Password
            </Button>
          </div>
        )}

        {tab === "appearance" && (
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ color: t.text, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>Appearance</h3>
            <p style={{ color: t.textSec, fontSize: 13, margin: "0 0 24px" }}>Customize how Nexus looks and feels</p>
            <label
              style={{
                display: "block",
                color: t.textSec,
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Theme Mode
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Light Mode", Icon: Sun, val: false },
                { label: "Dark Mode", Icon: Moon, val: true },
              ].map((th) => (
                <button
                  key={th.label}
                  onClick={() => setIsDark(th.val)}
                  style={{
                    padding: 18,
                    borderRadius: 10,
                    cursor: "pointer",
                    border: `2px solid ${isDark === th.val ? t.accent : t.border}`,
                    background: isDark === th.val ? t.accentDim : t.surface2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                >
                  <th.Icon size={22} color={isDark === th.val ? t.accent : t.textSec} />
                  <span style={{ color: isDark === th.val ? t.accent : t.textSec, fontSize: 13, fontWeight: 600 }}>{th.label}</span>
                  {isDark === th.val && <Check size={14} color={t.accent} />}
                </button>
              ))}
            </div>
            <label
              style={{
                display: "block",
                color: t.textSec,
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Accent Color
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {ACCENT_COLORS.map((c) => (
                <div
                  key={c}
                  title={c}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: c,
                    cursor: "pointer",
                    border: `3px solid ${c === t.accent ? t.text : "transparent"}`,
                    boxSizing: "border-box",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
