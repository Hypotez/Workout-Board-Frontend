import './App.css'
import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout"
import { usePageTitle } from "@/hooks/use-page-title"
import { ROUTES } from "@/config/routes"
import { ThemeProvider } from "@/components/darkmode/theme-provider"


function AppContent() {
  const pageTitle = usePageTitle()
  
  useEffect(() => {
    document.title = `${pageTitle} - Workout Board`
  }, [pageTitle])

  return (  
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          {ROUTES.map((route) => (
            <Route 
              key={route.path}
              path={route.path} 
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
