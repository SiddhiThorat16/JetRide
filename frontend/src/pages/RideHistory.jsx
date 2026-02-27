import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Nav from "../layout/Nav";
import { Clock, MapPin, CheckCircle, XCircle, Download } from "lucide-react";

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
        `${import.meta.env.VITE_BACKEND_URL}/history/my-rides`,
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      // ✅ Ensure array
      setRides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching history:", error);
      setRides([]); // Fallback empty array
    } finally {
      setLoading(false);
    }
  };

  const sendReceipt = async (rideId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/history/rides/${rideId}/receipt`,
        {
          method: "POST",
        },
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading ride history...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Ride History
          </h1>

          {rides.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Clock className="w-20 h-20 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-semibold mb-2">No rides yet</h3>
              <p>Book your first ride to see history here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.map((ride) => (
                <div
                  key={ride._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 text-white">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">
                          {ride.pickup?.address || "Unknown"} →{" "}
                          {ride.dropoff?.address || "Unknown"}
                        </h3>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{ride.fare || 0}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        ride.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : ride.status === "accepted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ride.status?.toUpperCase() || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {ride.createdAt
                        ? new Date(ride.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div>Distance: {ride.distance || "N/A"} km</div>
                    {ride.driver?.name && <div>Driver: {ride.driver.name}</div>}
                  </div>

                  <button
                    onClick={() => sendReceipt(ride._id)}
                    className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Send Receipt
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
