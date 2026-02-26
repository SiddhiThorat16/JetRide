import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing - only when signed OUT */}
        <Route 
          path="/" 
          element={
            <SignedOut>
              <Home />
            </SignedOut>
          } 
        />
        
        {/* Protected routes - only when signed IN */}
        <Route 
          path="/dashboard" 
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <SignedIn>
              <Profile />
            </SignedIn>
          } 
        />
        
        {/* Auth redirects */}
        <Route path="/sign-in/*" element={<RedirectToSignIn />} />
        <Route path="/sign-up/*" element={<RedirectToSignIn />} />
        
        {/* Catch all - redirect to dashboard if signed in, home if not */}
        <Route 
          path="*" 
          element={
            <SignedIn>
              <Navigate to="/dashboard" replace />
            </SignedIn>
            ||
            <SignedOut>
              <Navigate to="/" replace />
            </SignedOut>
          } 
        />
      </Routes>
    </Router>
  )
}
