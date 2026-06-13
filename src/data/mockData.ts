import type {
  RevenuePoint,
  PerfPoint,
  GrowthPoint,
  TrafficSource,
  Transaction,
  AppUser,
  ProjectItem,
  Message,
} from "../types";

export const revData: RevenuePoint[] = [
  { month: "Jan", revenue: 45200, expenses: 32100 },
  { month: "Feb", revenue: 52800, expenses: 35600 },
  { month: "Mar", revenue: 49100, expenses: 31200 },
  { month: "Apr", revenue: 61400, expenses: 38900 },
  { month: "May", revenue: 58700, expenses: 36400 },
  { month: "Jun", revenue: 72300, expenses: 42100 },
  { month: "Jul", revenue: 68500, expenses: 40800 },
  { month: "Aug", revenue: 79200, expenses: 46300 },
  { month: "Sep", revenue: 85100, expenses: 49700 },
  { month: "Oct", revenue: 91400, expenses: 53200 },
  { month: "Nov", revenue: 88600, expenses: 51900 },
  { month: "Dec", revenue: 102300, expenses: 59400 },
];

export const perfData: PerfPoint[] = [
  { day: "Mon", sessions: 4200, pageviews: 8400, conv: 210 },
  { day: "Tue", sessions: 3800, pageviews: 7200, conv: 190 },
  { day: "Wed", sessions: 5100, pageviews: 10200, conv: 255 },
  { day: "Thu", sessions: 4700, pageviews: 9400, conv: 235 },
  { day: "Fri", sessions: 6200, pageviews: 12400, conv: 310 },
  { day: "Sat", sessions: 3900, pageviews: 7800, conv: 195 },
  { day: "Sun", sessions: 3200, pageviews: 6400, conv: 160 },
];

export const growthData: GrowthPoint[] = [
  { week: "W1", newU: 234, ret: 1823 },
  { week: "W2", newU: 312, ret: 2156 },
  { week: "W3", newU: 189, ret: 1932 },
  { week: "W4", newU: 421, ret: 2341 },
  { week: "W5", newU: 387, ret: 2567 },
  { week: "W6", newU: 456, ret: 2789 },
  { week: "W7", newU: 398, ret: 2634 },
  { week: "W8", newU: 512, ret: 3012 },
];

export const traffic: TrafficSource[] = [
  { name: "Organic", value: 4231 },
  { name: "Social", value: 2876 },
  { name: "Direct", value: 1923 },
  { name: "Referral", value: 1204 },
  { name: "Email", value: 812 },
];

export const txns: Transaction[] = [
  { id: "#TR-001", name: "Aria Design System", amount: 2400, status: "completed", date: "Dec 12", cat: "Software" },
  { id: "#TR-002", name: "Cloud Hosting Plan", amount: 890, status: "completed", date: "Dec 11", cat: "Infrastructure" },
  { id: "#TR-003", name: "Marketing Campaign", amount: 5200, status: "pending", date: "Dec 10", cat: "Marketing" },
  { id: "#TR-004", name: "Team Subscription", amount: 1340, status: "completed", date: "Dec 9", cat: "Software" },
  { id: "#TR-005", name: "Office Supplies", amount: 320, status: "failed", date: "Dec 8", cat: "Operations" },
  { id: "#TR-006", name: "Analytics Tool", amount: 760, status: "completed", date: "Dec 7", cat: "Software" },
];

export const USERS: AppUser[] = [
  { id: 1, name: "Alice Johnson", email: "alice@techcorp.io", role: "Admin", status: "Active", joined: "Jan 12, 2024", loc: "San Francisco", ini: "AJ" },
  { id: 2, name: "Bob Martinez", email: "bob@techcorp.io", role: "Developer", status: "Active", joined: "Feb 3, 2024", loc: "Austin, TX", ini: "BM" },
  { id: 3, name: "Carol Kim", email: "carol@techcorp.io", role: "Designer", status: "Active", joined: "Feb 18, 2024", loc: "New York, NY", ini: "CK" },
  { id: 4, name: "David Osei", email: "david@techcorp.io", role: "Manager", status: "Inactive", joined: "Mar 5, 2024", loc: "London, UK", ini: "DO" },
  { id: 5, name: "Emma Chen", email: "emma@techcorp.io", role: "Developer", status: "Active", joined: "Mar 22, 2024", loc: "Seattle, WA", ini: "EC" },
  { id: 6, name: "Frank Torres", email: "frank@techcorp.io", role: "Analyst", status: "Active", joined: "Apr 8, 2024", loc: "Chicago, IL", ini: "FT" },
  { id: 7, name: "Grace Lee", email: "grace@techcorp.io", role: "Designer", status: "Pending", joined: "Apr 25, 2024", loc: "Boston, MA", ini: "GL" },
  { id: 8, name: "Hiro Tanaka", email: "hiro@techcorp.io", role: "Developer", status: "Active", joined: "May 10, 2024", loc: "Tokyo, Japan", ini: "HT" },
];

export const PROJECTS: ProjectItem[] = [
  { id: 1, name: "E-commerce Redesign", desc: "Complete UX overhaul with new design system and checkout flow", prog: 78, team: ["AJ", "BM", "CK"], due: "Mar 31", priority: "High", status: "In Progress", done: 23, total: 30, color: "#7C6FF7" },
  { id: 2, name: "Mobile App v2.0", desc: "Cross-platform app with offline-first architecture", prog: 45, team: ["EC", "HT", "FT"], due: "May 15", priority: "High", status: "In Progress", done: 14, total: 31, color: "#3FB950" },
  { id: 3, name: "API Gateway Migration", desc: "Moving from monolith to microservices with proper auth layers", prog: 92, team: ["BM", "HT"], due: "Jan 20", priority: "Critical", status: "Review", done: 46, total: 50, color: "#58A6FF" },
  { id: 4, name: "Marketing Analytics", desc: "Real-time dashboard for tracking campaign performance and ROI", prog: 31, team: ["FT", "GL", "AJ"], due: "Jun 30", priority: "Medium", status: "In Progress", done: 9, total: 29, color: "#D29922" },
  { id: 5, name: "Security Audit 2025", desc: "Comprehensive pen-testing, review and compliance check", prog: 15, team: ["DO", "AJ"], due: "Feb 28", priority: "Critical", status: "Planning", done: 3, total: 20, color: "#F85149" },
  { id: 6, name: "Data Warehouse", desc: "Centralized data infrastructure for analytics and ML pipelines", prog: 60, team: ["EC", "BM", "DO", "FT"], due: "Apr 15", priority: "High", status: "In Progress", done: 18, total: 30, color: "#A78BFA" },
];

export const MESSAGES: Message[] = [
  { from: "Alice Johnson", ini: "AJ", sub: "Q4 Report Ready for Review", prev: "I've finished the Q4 analysis and wanted to share findings before the board meeting.", time: "2m ago", unread: true },
  { from: "Bob Martinez", ini: "BM", sub: "API Integration Update", prev: "New endpoints are live in staging. Please test before we push to production.", time: "1h ago", unread: true },
  { from: "Carol Kim", ini: "CK", sub: "Design System v2 Launch", prev: "Excited to announce we're launching the new design system this Friday afternoon.", time: "3h ago", unread: false },
  { from: "David Osei", ini: "DO", sub: "Team Meeting Tomorrow", prev: "Reminder: weekly standup at 10am. Please come prepared with your updates.", time: "5h ago", unread: false },
  { from: "Emma Chen", ini: "EC", sub: "Database Migration Plan", prev: "Finished the migration plan for Q1. Looking forward to your feedback on it.", time: "1d ago", unread: false },
];
