import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { user } = useUser();
  const location = useLocation();

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
                location.pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === "/profile"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Profile
            </Link>
            <Link
              to="/driver-dashboard"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === "/driver-dashboard"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Driver
            </Link>

            <Link
              to="/history"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === "/history"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              History
            </Link>

            <Link
              to="/ratings"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                location.pathname === "/ratings"
                  ? "bg-yellow-100 text-yellow-700"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              Ratings
            </Link>

            <UserButton />
            <SignOutButton>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
