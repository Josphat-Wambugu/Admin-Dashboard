import type { ReactNode, CSSProperties } from "react";
import type {
  BadgeProps,
  AvatarProps,
  ProgressProps,
  CardProps,
  BadgeType,
  Theme,
} from "../types";

/* ─── BADGE ─── */
export function Badge({ label, type, t }: BadgeProps) {
  const map: Record<BadgeType, { bg: string; fg: string }> = {
    success: { bg: t.successDim, fg: t.success },
    warning: { bg: t.warningDim, fg: t.warning },
    danger: { bg: t.dangerDim, fg: t.danger },
    info: { bg: t.infoDim, fg: t.info },
    accent: { bg: t.accentDim, fg: t.accent },
  };
  const c = map[type] || map.info;
  return (
    <span
      style={{
        background: c.bg,
        color: c.fg,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11.5,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ─── AVATAR ─── */
export function Avt({ ini, sz = 34, color = "#7C6FF7" }: AvatarProps) {
  return (
    <div
      style={{
        width: sz,
        height: sz,
        borderRadius: "50%",
        background: color + "25",
        border: `2px solid ${color}40`,
        color,
        fontSize: sz * 0.33,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {ini}
    </div>
  );
}

/* ─── PROGRESS BAR ─── */
export function Prog({ val, color, t }: ProgressProps) {
  return (
    <div style={{ height: 6, background: t.surface3, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${val}%`, height: "100%", background: color, borderRadius: 3 }} />
    </div>
  );
}

/* ─── CARD ─── */
export function Card({ t, children, style = {} }: CardProps) {
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── BUTTON ─── */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps {
  t: Theme;
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  active?: boolean;
  style?: CSSProperties;
  title?: string;
}

export function Button({
  t,
  children,
  onClick,
  variant = "secondary",
  icon,
  active = false,
  style = {},
  title,
}: ButtonProps) {
  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: { background: t.accent, border: "none", color: "#fff", fontWeight: 600 },
    secondary: { background: t.surface2, border: `1px solid ${t.border}`, color: t.textSec },
    ghost: { background: "transparent", border: "none", color: t.accent, fontWeight: 500 },
    danger: { background: t.dangerDim, border: "none", color: t.danger, fontWeight: 500 },
  };
  const activeStyle: CSSProperties = active
    ? { background: t.accent, color: "#fff", border: `1px solid ${t.accent}` }
    : {};
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 8,
        fontSize: 13,
        cursor: "pointer",
        ...variants[variant],
        ...activeStyle,
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

/* ─── ICON BUTTON ─── */
export interface IconButtonProps {
  t: Theme;
  children: ReactNode;
  onClick?: () => void;
  size?: number;
  title?: string;
  style?: CSSProperties;
}

export function IconButton({ t, children, onClick, size = 36, title, style = {} }: IconButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ─── PILL TOGGLE BUTTON (filters / tabs) ─── */
export interface PillButtonProps {
  t: Theme;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function PillButton({ t, label, active, onClick }: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 500,
        background: active ? t.accent : "transparent",
        color: active ? "#fff" : t.textSec,
        border: `1px solid ${active ? t.accent : t.border}`,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* ─── TAB BUTTON (underline style) ─── */
export interface TabButtonProps {
  t: Theme;
  label: string;
  icon?: ReactNode;
  active: boolean;
  onClick: () => void;
}

export function TabButton({ t, label, icon, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "13px 16px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        color: active ? t.accent : t.textSec,
        fontWeight: active ? 600 : 400,
        borderBottom: `2px solid ${active ? t.accent : "transparent"}`,
        marginBottom: -1,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── TOGGLE SWITCH ─── */
export interface ToggleSwitchProps {
  t: Theme;
  on: boolean;
  onClick?: () => void;
}

export function ToggleSwitch({ t, on, onClick }: ToggleSwitchProps) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 42,
        height: 23,
        borderRadius: 12,
        background: on ? t.accent : t.surface3,
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 17,
          height: 17,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: on ? 22 : 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

/* ─── SEARCH INPUT ─── */
export interface SearchInputProps {
  t: Theme;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  icon: ReactNode;
  style?: CSSProperties;
}

export function SearchInput({ t, value, onChange, placeholder, icon, style = {} }: SearchInputProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 8,
        padding: "7px 12px",
        ...style,
      }}
    >
      {icon}
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        style={{
          border: "none",
          background: "transparent",
          outline: "none",
          color: t.text,
          fontSize: 13,
          width: "100%",
        }}
      />
    </div>
  );
}
