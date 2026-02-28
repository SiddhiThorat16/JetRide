import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Nav from "../layout/Nav";
import {
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Download,
  ChevronRight,
} from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return dateStr;
  }
}

export default function RideHistory() {
  const { user } = useUser();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/history/my-rides`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setRides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  const sendReceipt = async (rideId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/history/rides/${rideId}/receipt`,
        { method: "POST" }
      );
      if (response.ok) {
        alert("Receipt sent to your email!");
      }
    } catch (error) {
      alert("Failed to send receipt");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center">
        <div className="max-w-4xl mx-auto py-24 px-6 text-center">
          <div className="animate-pulse inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <p className="mt-6 text-lg text-gray-600">Loading ride history...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow">
                <MapPin className="w-5 h-5" />
              </span>
              Ride History
            </h1>
            <p className="mt-1 text-sm text-gray-500">A record of your completed and recent rides.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-400">Signed in as</div>
              <div className="text-sm font-medium text-gray-900">{user?.fullName || user?.primaryEmailAddress?.emailAddress || 'You'}</div>
            </div>
            <button onClick={fetchHistory} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              Refresh
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {rides.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
                  <Clock className="w-24 h-24 mx-auto text-gray-300" />
                  <h3 className="mt-6 text-2xl font-semibold text-gray-900">No rides yet</h3>
                  <p className="mt-2 text-gray-500">Book your first ride to see history here.</p>
                </div>
              ) : (
                rides.map((ride) => (
                  <div key={ride._id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow">
                          <MapPin className="w-6 h-6" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {ride.pickup?.address || 'Unknown'}
                            <span className="mx-2 text-gray-400">→</span>
                            {ride.dropoff?.address || 'Unknown'}
                          </h3>
                          <div className="mt-1 text-sm text-gray-500">
                            {formatDate(ride.createdAt)} • <span className="font-medium text-green-600">₹{ride.fare || 0}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {ride.status === 'completed' ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                              <CheckCircle className="w-4 h-4" /> Completed
                            </span>
                          ) : ride.status === 'accepted' ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                              <XCircle className="w-4 h-4" /> Accepted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 text-gray-700 text-sm font-medium">
                              {ride.status || 'N/A'}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                          {ride.driver?.name ? `Driver: ${ride.driver.name}` : 'Driver: —'}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{ride.distance ? `${ride.distance} km` : 'Distance N/A'}</span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Payment</div>
                        <div className="font-medium">{ride.paymentMethod || 'Cash / Card'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Status</div>
                        <div className="font-medium">{ride.status || 'N/A'}</div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => sendReceipt(ride._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                      >
                        <Download className="w-4 h-4" />
                        Send Receipt
                      </button>
                      <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-900">Summary</h4>
                <p className="mt-2 text-sm text-gray-500">Total rides: <span className="font-medium text-gray-900">{rides.length}</span></p>
                <p className="mt-1 text-sm text-gray-500">Recent: {rides[0]?.pickup?.address || '—'}</p>
              </div>

              <div className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white rounded-2xl p-4 shadow">
                <h5 className="text-sm font-semibold">Need help?</h5>
                <p className="mt-2 text-sm opacity-90">Contact support for missing receipts or ride disputes.</p>
                <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white text-indigo-600 rounded-lg px-3 py-2 font-medium">Contact Support</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
