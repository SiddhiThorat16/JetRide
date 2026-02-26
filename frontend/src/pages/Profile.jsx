import { useUser, useClerk } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'
import Nav from '../layout/Nav'

export default function Profile() {
  const { user } = useUser()
  const { loaded } = useClerk()
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    role: 'rider'
  })

  useEffect(() => {
    if (user && loaded) {
      setProfileData({
        name: user.fullName || user.username || '',
        phone: user.phoneNumbers[0]?.number || '',
        role: 'rider' // Fetch from backend later
      })
    }
  }, [user, loaded])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Update profile via backend API (Day 4)
    console.log('Profile update:', profileData)
  }

  if (!loaded) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
          <div className="text-center mb-10">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                user.firstName?.[0]?.toUpperCase()
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
            <p className="text-gray-600 mt-1">{user.primaryEmailAddress?.emailAddress}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={profileData.role}
                onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
