import type { ReactNode, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

/* ─── THEME ─── */
export interface Theme {
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  border: string;
  text: string;
  textSec: string;
  textMuted: string;
  accent: string;
  accentDim: string;
  accentBright: string;
  success: string;
  successDim: string;
  warning: string;
  warningDim: string;
  danger: string;
  dangerDim: string;
  info: string;
  infoDim: string;
  chart: string[];
}

/* ─── NAVIGATION ─── */
export type PageId =
  | "overview"
  | "analytics"
  | "users"
  | "projects"
  | "messages"
  | "calendar"
  | "transactions"
  | "settings"
  | "help";

export interface NavItem {
  id: PageId;
  label: string;
  Icon: LucideIcon;
  badge?: number;
}

/* ─── SHARED UI ─── */
export type BadgeType = "success" | "warning" | "danger" | "info" | "accent";

export interface BadgeProps {
  label: string;
  type: BadgeType;
  t: Theme;
}

export interface AvatarProps {
  ini: string;
  sz?: number;
  color?: string;
}

export interface ProgressProps {
  val: number;
  color: string;
  t: Theme;
}

export interface CardProps {
  t: Theme;
  children: ReactNode;
  style?: CSSProperties;
}

/* ─── PAGE PROPS ─── */
export interface PageProps {
  t: Theme;
  setPage?: (id: PageId) => void;
}

export interface SettingsPageProps extends PageProps {
  isDark: boolean;
  setIsDark: (val: boolean | ((prev: boolean) => boolean)) => void;
}

/* ─── DATA MODELS ─── */
export interface RevenuePoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface PerfPoint {
  day: string;
  sessions: number;
  pageviews: number;
  conv: number;
}

export interface GrowthPoint {
  week: string;
  newU: number;
  ret: number;
}

export interface TrafficSource {
  name: string;
  value: number;
}

export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  cat: string;
}

export type UserStatus = "Active" | "Inactive" | "Pending";

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  joined: string;
  loc: string;
  ini: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  desc: string;
  prog: number;
  team: string[];
  due: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "In Progress" | "Review" | "Planning";
  done: number;
  total: number;
  color: string;
}

export interface Message {
  from: string;
  ini: string;
  sub: string;
  prev: string;
  time: string;
  unread: boolean;
}

export interface CalendarEvent {
  title: string;
  clr: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  clr: string;
}
