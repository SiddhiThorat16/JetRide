import { useUser, SignOutButton, UserButton } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { user } = useUser()
  const location = useLocation()

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
            🚀 JetRide
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === '/dashboard' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === '/profile' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Profile
            </Link>
            
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.MenuItem>
                  <SignOutButton />
                </UserButton.MenuItem>
              </UserButton.MenuItems>
            </UserButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
