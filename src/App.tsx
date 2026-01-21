import './App.css';
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { usePageTitle } from '@/hooks/use-page-title';
import { ROUTES } from '@/config/routes';
import { ThemeProvider } from '@/components/darkmode/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/protectedRoute';
import RoutineDetail from '@/pages/routine-detail';

const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools }))
);

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
          path={ROUTES.dashboard.path}
          element={
            <ProtectedRoute>
              <ROUTES.dashboard.component />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.workouts.path}
          element={
            <ProtectedRoute>
              <ROUTES.workouts.component />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.routines.path}
          element={
            <ProtectedRoute>
              <ROUTES.routines.component />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.routineDetail.path}
          element={
            <ProtectedRoute>
              <RoutineDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ai.path}
          element={
            <ProtectedRoute>
              <ROUTES.ai.component />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.settings.path}
          element={
            <ProtectedRoute>
              <ROUTES.settings.component />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={ROUTES.login.path} replace />} />
      </Routes>

      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}

      <Toaster position="bottom-center" richColors closeButton />
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
