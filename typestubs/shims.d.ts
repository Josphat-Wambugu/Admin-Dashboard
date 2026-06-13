/**
 * Ambient type declarations used ONLY for offline type-checking in this
 * sandbox (no network access to fetch real @types/react, @types/react-dom,
 * lucide-react, or recharts type definitions).
 *
 * These are intentionally loose but shaped like the real packages so that
 * `npm run build` / `tsc` against the REAL dependencies (after `npm install`)
 * will behave the same way. This file is NOT needed once `node_modules` with
 * the real type declarations is installed -- `tsconfig.check.json` (which
 * includes this folder) is for offline verification only.
 */

/* ----------------------- react ----------------------- */
declare module "react" {
  export type Key = string | number;

  export interface Attributes {
    key?: Key | null;
  }

  export interface CSSProperties {
    [property: string]: string | number | undefined;
  }

  export type ReactNode = any;
  export type ReactElement = any;

  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);

  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any>): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useRef<T>(initialValue: T): { current: T };

  export interface FunctionComponent<P = {}> {
    (props: P): ReactNode;
  }
  export type FC<P = {}> = FunctionComponent<P>;

  export interface BaseSyntheticEvent<E = object, C = any, T = any> {
    target: T;
    currentTarget: C;
    preventDefault(): void;
    stopPropagation(): void;
    nativeEvent: E;
    [key: string]: any;
  }
  export type ChangeEvent<T = Element> = BaseSyntheticEvent<Event, T, T & { value: string; checked?: boolean }>;
  export type MouseEvent<T = Element> = BaseSyntheticEvent<globalThis.MouseEvent, T, T>;
  export type FormEvent<T = Element> = BaseSyntheticEvent<Event, T, T>;
  export type KeyboardEvent<T = Element> = BaseSyntheticEvent<globalThis.KeyboardEvent, T, T> & {
    key: string;
    code: string;
  };

  export const StrictMode: FC<{ children?: ReactNode }>;

  const React: {
    StrictMode: typeof StrictMode;
    [key: string]: any;
  };
  export default React;
}

declare module "react-dom/client" {
  import type { ReactNode } from "react";
  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactNode): void;
  };
}

declare module "react/jsx-runtime" {
  export const Fragment: unique symbol;
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
}

declare module "*.css";

/* ----------------------- JSX ----------------------- */
declare namespace JSX {
  interface Element {}
  interface ElementClass {
    render(): any;
  }
  interface ElementAttributesProperty {
    props: {};
  }
  interface ElementChildrenAttribute {
    children: {};
  }
  interface IntrinsicAttributes {
    key?: string | number | null;
  }
  interface IntrinsicClassAttributes<T> {
    ref?: any;
  }

  interface DOMAttributes {
    children?: any;
    onClick?: (event: import("react").MouseEvent<any>) => void;
    onChange?: (event: import("react").ChangeEvent<any>) => void;
    [key: string]: any;
  }

  interface IntrinsicElements {
    input: DOMAttributes & { value?: string | number; type?: string; [key: string]: any };
    textarea: DOMAttributes & { value?: string | number; [key: string]: any };
    select: DOMAttributes & { value?: string | number; [key: string]: any };
    [elemName: string]: any;
  }

  type LibraryManagedAttributes<C, P> = P & IntrinsicAttributes;
}

/* ----------------------- lucide-react ----------------------- */
declare module "lucide-react" {
  import type { CSSProperties } from "react";

  export interface LucideProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    style?: CSSProperties;
    className?: string;
    [key: string]: any;
  }

  export type LucideIcon = (props: LucideProps) => any;

  export const Activity: LucideIcon;
  export const ArrowDownRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const BarChart2: LucideIcon;
  export const Bell: LucideIcon;
  export const Calendar: LucideIcon;
  export const Check: LucideIcon;
  export const Clock: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Eye: LucideIcon;
  export const Filter: LucideIcon;
  export const FolderKanban: LucideIcon;
  export const Globe: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const LogOut: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Moon: LucideIcon;
  export const MoreHorizontal: LucideIcon;
  export const Plus: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Shield: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const Sun: LucideIcon;
  export const Target: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const Zap: LucideIcon;
}

/* ----------------------- recharts ----------------------- */
declare module "recharts" {
  import type { ReactNode } from "react";

  export interface ChartComponentProps {
    data?: any[];
    children?: ReactNode;
    width?: number | string;
    height?: number | string;
    [key: string]: any;
  }

  export const AreaChart: (props: ChartComponentProps) => any;
  export const Area: (props: ChartComponentProps) => any;
  export const BarChart: (props: ChartComponentProps) => any;
  export const Bar: (props: ChartComponentProps) => any;
  export const PieChart: (props: ChartComponentProps) => any;
  export const Pie: (props: ChartComponentProps) => any;
  export const Cell: (props: ChartComponentProps) => any;
  export const LineChart: (props: ChartComponentProps) => any;
  export const Line: (props: ChartComponentProps) => any;
  export const XAxis: (props: ChartComponentProps) => any;
  export const YAxis: (props: ChartComponentProps) => any;
  export const CartesianGrid: (props: ChartComponentProps) => any;
  export const Tooltip: (props: ChartComponentProps) => any;
  export const ResponsiveContainer: (props: ChartComponentProps) => any;
}
