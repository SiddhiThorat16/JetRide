import Nav from '../layout/Nav'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Here's what's happening with your rides today.</p>
            </div>

            {/* Recent Rides */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Rides</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Airport to Downtown</p>
                    <p className="text-sm text-gray-500">2 hours ago • ₹250</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
                    Rate Driver
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-8">
              <h3 className="text-lg font-semibold mb-4">Book New Ride</h3>
              <Link 
                to="/book-ride" 
                className="w-full block bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                Book Now →
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Rating</h3>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,4.2].map((star, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
