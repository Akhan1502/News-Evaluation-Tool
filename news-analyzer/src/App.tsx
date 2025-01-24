import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './contexts/auth-context'
import { AuthPage } from './routes/auth/page'
import { ProfilePage } from './routes/profile/page'
import { useAuth } from './contexts/auth-context'
import { HomePage } from './routes/home/page'
import { AnalyzerPage } from './routes/analyzer/page'
import './App.css'

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" />
}

// Auth Route component (redirects to home if already authenticated)
function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/auth" 
        element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analyzer" 
        element={
          <ProtectedRoute>
            <AnalyzerPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not defined in environment variables')
    return (
      <div className="text-red-500 p-4">
        Error: Google Client ID not configured
      </div>
    )
  }

  return (
    <GoogleOAuthProvider 
      clientId={GOOGLE_CLIENT_ID}
      onScriptLoadError={(err) => {
        console.error('Google Script Load Error:', err)
      }}
      onScriptLoadSuccess={() => {
        console.log('Google Script Loaded Successfully')
      }}
    >
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
