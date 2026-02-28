import Nav from '../layout/Nav'
import { Link } from 'react-router-dom'
import { CreditCard, Clock, MapPin, Star, Users, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Nav />

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow">
                <MapPin className="w-5 h-5" />
              </span>
              Welcome Back!
            </h1>
            <p className="mt-1 text-sm text-gray-500">Here's what's happening with your rides today.</p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <Users className="w-4 h-4 text-gray-600" />
              Invite Friends
            </button>
            <Link to="/book-ride" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition">
              Book Ride
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total Rides</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">128</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Earnings (Monthly)</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">₹24,560</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">4.2</p>
                  </div>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-50 text-yellow-500">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Rides</h3>
                <Link to="/history" className="text-sm text-blue-600 hover:underline">View all</Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Airport → Downtown</p>
                    <p className="text-sm text-gray-500">2 hours ago • ₹250</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/ratings" className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100">Rate Driver</Link>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Receipt</button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Station → Mall</p>
                    <p className="text-sm text-gray-500">Yesterday • ₹180</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/ratings" className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100">Rate Driver</Link>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Receipt</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900">Quick Actions</h4>
              <div className="mt-4 grid gap-3">
                <Link to="/book-ride" className="block text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">Book New Ride</Link>
                <Link to="/profile" className="block text-center px-4 py-3 border border-gray-200 rounded-lg bg-white">Edit Profile</Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow">
              <h5 className="text-sm font-semibold">Promotions</h5>
              <p className="mt-2 text-sm opacity-90">Refer friends and earn ride credits.</p>
              <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white text-indigo-600 rounded-lg px-3 py-2 font-medium">Invite Friends</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
