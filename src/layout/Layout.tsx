import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  FolderKanban,
  Settings,
  Sun,
  Moon,
  Bell,
  Search,
  LogOut,
  Zap,
  Calendar,
  MessageSquare,
  HelpCircle,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
} from "lucide-react";
import type { NavItem, PageId, Theme } from "../types";
import { Avt, IconButton, SearchInput } from "../components/ui";

/* ─── NAVIGATION CONFIG ─── */
export const NAV: NavItem[] = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", Icon: BarChart2 },
  { id: "users", label: "Users", Icon: Users },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "messages", label: "Messages", Icon: MessageSquare, badge: 3 },
  { id: "calendar", label: "Calendar", Icon: Calendar },
  { id: "transactions", label: "Transactions", Icon: ReceiptText },
];

export const BOT: NavItem[] = [
  { id: "settings", label: "Settings", Icon: Settings },
  { id: "help", label: "Help & Support", Icon: HelpCircle },
];

export const TITLES: Record<PageId, string> = {
  overview: "Overview",
  analytics: "Analytics",
  users: "User Management",
  projects: "Projects",
  messages: "Messages",
  calendar: "Calendar",
  transactions: "Transactions",
  settings: "Settings",
  help: "Help & Support",
};

/* ─── SIDEBAR ─── */
interface SidebarProps {
  page: PageId;
  setPage: (id: PageId) => void;
  t: Theme;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

function NavBtn({
  id,
  label,
  Icon,
  badge,
  page,
  setPage,
  t,
  collapsed,
}: NavItem & {
  page: PageId;
  setPage: (id: PageId) => void;
  t: Theme;
  collapsed: boolean;
}) {
  const on = page === id;
  return (
    <button
      onClick={() => setPage(id)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "10px 0" : "8px 12px",
        borderRadius: 8,
        marginBottom: 1,
        background: on ? t.accentDim : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        color: on ? t.accent : t.textSec,
        fontWeight: on ? 600 : 400,
        fontSize: 13.5,
        position: "relative",
        transition: "background 0.15s",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      {on && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "18%",
            bottom: "18%",
            width: 3,
            borderRadius: "0 3px 3px 0",
            background: t.accent,
          }}
        />
      )}
      <Icon size={16} color={on ? t.accent : t.textSec} />
      {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
      {!collapsed && badge && (
        <span
          style={{
            background: t.accent,
            color: "#fff",
            borderRadius: 10,
            padding: "1px 6px",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      )}
      {collapsed && badge && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 18,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: t.accent,
          }}
        />
      )}
    </button>
  );
}

export function Sidebar({
  page,
  setPage,
  t,
  collapsed,
  setCollapsed,
  isMobile,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const sidebarWidth = isMobile ? 260 : collapsed ? 88 : 232;
  const showLabels = !isMobile || mobileOpen;

  return (
    <>
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 40,
          }}
        />
      )}
      <aside
        style={{
          width: isMobile ? (mobileOpen ? 260 : 0) : sidebarWidth,
          transform: isMobile && !mobileOpen ? "translateX(-100%)" : "translateX(0)",
          flexShrink: 0,
          background: t.surface,
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: isMobile ? "fixed" : "sticky",
          top: 0,
          left: 0,
          overflow: "hidden",
          zIndex: isMobile ? 50 : 1,
          transition: "width 0.2s ease, transform 0.2s ease",
        }}
      >
        <div
          style={{
            padding: collapsed ? "18px 10px 14px" : "18px 18px 14px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: showLabels ? "flex-start" : "center" }}>
            <button
              type="button"
              onClick={() => (isMobile ? setMobileOpen(false) : setCollapsed(!collapsed))}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: `1px solid ${t.border}`,
                cursor: "pointer",
                color: t.textSec,
                flexShrink: 0,
              }}
            >
              {isMobile ? <PanelLeftClose size={16} /> : collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
            {showLabels && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.accent}, ${t.accentBright})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap size={16} color="#fff" />
                </div>
                <div>
                  <p style={{ color: t.text, fontWeight: 800, fontSize: 15, margin: 0, letterSpacing: "-0.3px" }}>
                    Nexus
                  </p>
                  <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>Analytics Platform</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          {showLabels && (
            <p
              style={{
                color: t.textMuted,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 10px 8px",
                margin: 0,
              }}
            >
              Menu
            </p>
          )}
          {NAV.map((n) => (
            <NavBtn key={n.id} {...n} page={page} setPage={setPage} t={t} collapsed={isMobile ? false : collapsed} />
          ))}
          {showLabels && (
            <p
              style={{
                color: t.textMuted,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "16px 10px 8px",
                margin: 0,
              }}
            >
              Account
            </p>
          )}
          {BOT.map((n) => (
            <NavBtn key={n.id} {...n} page={page} setPage={setPage} t={t} collapsed={isMobile ? false : collapsed} />
          ))}
        </nav>
        <div
          style={{
            padding: showLabels ? "12px 14px" : "12px 10px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: showLabels ? "flex-start" : "center",
            gap: 10,
          }}
        >
          {showLabels ? (
            <>
              <Avt ini="AJ" sz={32} color={t.accent} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: t.text,
                    fontSize: 13,
                    fontWeight: 600,
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Alice Johnson
                </p>
                <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>Administrator</p>
              </div>
            </>
          ) : (
            <Avt ini="AJ" sz={32} color={t.accent} />
          )}
          {showLabels && <LogOut size={15} color={t.textMuted} style={{ cursor: "pointer", flexShrink: 0 }} />}
        </div>
      </aside>
    </>
  );
}

/* ─── HEADER ─── */
interface HeaderProps {
  page: PageId;
  t: Theme;
  isDark: boolean;
  setIsDark: (val: boolean | ((prev: boolean) => boolean)) => void;
  onMenuToggle: () => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile: boolean;
}

interface NotifItem {
  msg: string;
  time: string;
  dot: string;
}

export function Header({ page, t, isDark, setIsDark, onMenuToggle, collapsed, setCollapsed, isMobile }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const notifs: NotifItem[] = [
    { msg: "API Gateway migration is at 92% — ready for review", time: "5m ago", dot: t.success },
    { msg: "New user Bob Martinez joined the workspace", time: "1h ago", dot: t.info },
    { msg: "Transaction #TR-005 failed to process", time: "3h ago", dot: t.danger },
  ];

  return (
    <header
      style={{
        height: 60,
        padding: "0 24px",
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <IconButton t={t} onClick={() => (isMobile ? onMenuToggle() : setCollapsed(!collapsed))} title="Toggle navigation">
        {isMobile ? <Menu size={15} color={t.textSec} /> : collapsed ? <PanelLeftOpen size={16} color={t.textSec} /> : <PanelLeftClose size={16} color={t.textSec} />}
      </IconButton>
      <h1 style={{ color: t.text, fontSize: 17, fontWeight: 700, flex: 1, margin: 0 }}>
        {TITLES[page] || "Dashboard"}
      </h1>

      <SearchInput t={t} placeholder="Search…" icon={<Search size={14} color={t.textMuted} />} style={{ width: 200 }} />

      <div style={{ position: "relative" }}>
        <IconButton t={t} onClick={() => setOpen((o) => !o)}>
          <Bell size={15} color={t.textSec} />
          <span
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              background: t.accent,
              borderRadius: "50%",
              border: `2px solid ${t.surface}`,
            }}
          />
        </IconButton>
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 44,
              width: 300,
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              zIndex: 60,
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: `1px solid ${t.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: t.text, fontWeight: 700, fontSize: 13.5 }}>Notifications</span>
              <span style={{ color: t.accent, fontSize: 12, cursor: "pointer" }}>Mark all read</span>
            </div>
            {notifs.map((n, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  gap: 10,
                  borderBottom: i < notifs.length - 1 ? `1px solid ${t.border}` : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: n.dot,
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <div>
                  <p style={{ color: t.text, fontSize: 13, margin: "0 0 2px" }}>{n.msg}</p>
                  <p style={{ color: t.textMuted, fontSize: 11, margin: 0 }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <IconButton t={t} onClick={() => setIsDark((d) => !d)} title="Toggle theme">
        {isDark ? <Sun size={15} color={t.textSec} /> : <Moon size={15} color={t.textSec} />}
      </IconButton>
    </header>
  );
}

/* ─── LAYOUT WRAPPER ─── */
interface LayoutProps {
  page: PageId;
  setPage: (id: PageId) => void;
  t: Theme;
  isDark: boolean;
  setIsDark: (val: boolean | ((prev: boolean) => boolean)) => void;
  children: ReactNode;
}

export function Layout({ page, setPage, t, isDark, setIsDark, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
        background: t.bg,
        color: t.text,
      }}
    >
      <Sidebar
        page={page}
        setPage={setPage}
        t={t}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header
          page={page}
          t={t}
          isDark={isDark}
          setIsDark={setIsDark}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
        <main style={{ flex: 1, padding: 22, overflowY: "auto", minHeight: 0 }}>{children}</main>
      </div>
    </div>
  );
}
