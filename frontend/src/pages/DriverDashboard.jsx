import { useState, useEffect } from 'react'
import Nav from '../layout/Nav'
import { Car, MapPin, Phone, CheckCircle } from 'lucide-react'

export default function DriverDashboard() {
  const [availableRides, setAvailableRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRides();
    const interval = setInterval(fetchRides, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRides = async () => {
    try {
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/drivers/rides`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // ✅ SAFE: Ensure array
      setAvailableRides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching rides:', error);
      setError(error.message);
      setAvailableRides([]);
    } finally {
      setLoading(false);
    }
  };

  const acceptRide = async (rideId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/drivers/rides/${rideId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId: 'driver_001' })
      });
      
      if (response.ok) {
        alert('Ride accepted!');
        fetchRides();
      } else {
        alert('Failed to accept ride');
      }
    } catch (error) {
      alert('Failed to accept ride');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading available rides...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex items-center mb-8">
            <Car className="w-12 h-12 text-green-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Accept rides from nearby riders</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6">
              Error: {error}
              <button 
                onClick={fetchRides} 
                className="ml-4 text-red-600 hover:underline font-medium"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid gap-6">
            {availableRides.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No rides available</h3>
                <p>Book a ride first or check back in a few minutes</p>
              </div>
            ) : (
              availableRides.map((ride) => (
                <div key={ride._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {ride.pickup?.address || 'Unknown'} → {ride.dropoff?.address || 'Unknown'}
                        </h3>
                        <p className="text-sm text-gray-500">₹{ride.fare} | {ride.status}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      New Request
                    </span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Rider</p>
                      <p className="text-sm text-gray-500">Anonymous</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => acceptRide(ride._id)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    Accept Ride
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
