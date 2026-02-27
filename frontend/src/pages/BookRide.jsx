import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Car, MapPin } from 'lucide-react'
import Nav from '../layout/Nav'

export default function BookRide() {
  const { user } = useUser()
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [rideType, setRideType] = useState('comfort')
  const [loading, setLoading] = useState(false)

  const handleBookRide = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rider: user.id,
          pickup: { address: pickup },
          dropoff: { address: dropoff },
          fare: rideType === 'comfort' ? 250 : 400,
          status: 'requested'
        })
      })
      
      if (response.ok) {
        alert('Ride booked successfully!')
        setPickup('')
        setDropoff('')
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      alert('Booking failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ride Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Ride</h1>
            
            <form onSubmit={handleBookRide} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup address"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  Drop-off Location
                </label>
                <input
                  type="text"
                  placeholder="Enter drop-off address"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ride Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all cursor-pointer group">
                    <Car className="w-5 h-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-gray-900">Comfort</div>
                      <div className="text-sm text-gray-500">₹12/km</div>
                    </div>
                    <input
                      type="radio"
                      value="comfort"
                      checked={rideType === 'comfort'}
                      onChange={(e) => setRideType(e.target.value)}
                      className="ml-auto w-4 h-4"
                    />
                  </label>
                  
                  <label className="flex items-center p-4 border-2 border-purple-200 rounded-xl hover:border-purple-300 transition-all cursor-pointer group bg-purple-50">
                    <Car className="w-5 h-5 mr-3 text-purple-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-gray-900">Premium</div>
                      <div className="text-sm text-gray-500">₹18/km</div>
                    </div>
                    <input
                      type="radio"
                      value="premium"
                      checked={rideType === 'premium'}
                      onChange={(e) => setRideType(e.target.value)}
                      className="ml-auto w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Booking...' : `Book ${rideType} Ride`}
              </button>
            </form>
          </div>

          {/* Map Preview Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Route Preview</h2>
            <div className="h-96 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select pickup & drop-off to see route</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
