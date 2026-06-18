import { useState } from "react";
import type { PageId } from "./types";
import { DARK, LIGHT } from "./theme/theme";
import { Layout } from "./layout/Layout";
import {
  OverviewPage,
  AnalyticsPage,
  UsersPage,
  ProjectsPage,
  MessagesPage,
  CalendarPage,
  TransactionsPage,
  SettingsPage,
  HelpPage,
} from "./pages";

export default function App() {
  const [page, setPage] = useState<PageId>("overview");
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? DARK : LIGHT;

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <OverviewPage t={t} setPage={setPage} />;
      case "analytics":
        return <AnalyticsPage t={t} />;
      case "users":
        return <UsersPage t={t} />;
      case "projects":
        return <ProjectsPage t={t} />;
      case "messages":
        return <MessagesPage t={t} />;
      case "calendar":
        return <CalendarPage t={t} />;
      case "transactions":
        return <TransactionsPage t={t} />;
      case "settings":
        return <SettingsPage t={t} isDark={isDark} setIsDark={setIsDark} />;
      case "help":
        return <HelpPage t={t} />;
      default:
        return <OverviewPage t={t} setPage={setPage} />;
    }
  };

  return (
    <Layout page={page} setPage={setPage} t={t} isDark={isDark} setIsDark={setIsDark}>
      {renderPage()}
    </Layout>
  );
}
