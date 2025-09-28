import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { usePageTitle } from '@/hooks/use-page-title';
import { ROUTES } from '@/config/routes';
import { ThemeProvider } from '@/components/darkmode/theme-provider';

function AppContent() {
  const pageTitle = usePageTitle();

  useEffect(() => {
    document.title = `${pageTitle} - Workout Board`;
  }, [pageTitle]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path={ROUTES.login.path} element={<ROUTES.login.component />} />

        <Route path={ROUTES.register.path} element={<ROUTES.register.component />} />

        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path={ROUTES.dashboard.path} element={<ROUTES.dashboard.component />} />

                <Route path={ROUTES.workouts.path} element={<ROUTES.workouts.component />} />

                <Route path={ROUTES.routines.path} element={<ROUTES.routines.component />} />

                <Route path={ROUTES.ai.path} element={<ROUTES.ai.component />} />

                <Route path={ROUTES.settings.path} element={<ROUTES.settings.component />} />

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
