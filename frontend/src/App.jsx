import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { SignInButton, SignUpButton, SignOutButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useEffect } from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-8">Welcome to JetRide 🚀</h1>
        <div className="space-x-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
