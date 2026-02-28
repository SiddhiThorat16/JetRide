import { useUser, useClerk } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Nav from "../layout/Nav";
import { User, Phone, Edit2, Check } from "lucide-react";

export default function Profile() {
  const { user } = useUser();
  const { loaded } = useClerk();
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    role: "rider",
  });

  useEffect(() => {
    if (user && loaded) {
      setProfileData({
        name: user.fullName || user.username || "",
        phone: user.phoneNumbers[0]?.number || "",
        role: "rider", // Fetch from backend later
      });
    }
  }, [user, loaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update profile via backend API (Day 4)
    console.log("Profile update:", profileData);
  };

  if (!loaded)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile…</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl shadow-lg overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold">{user.firstName?.[0]?.toUpperCase() || <User className="w-8 h-8" />}</span>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{user.fullName}</h2>
                <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">{profileData.role}</span>
                  <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
                Print Profile
              </button>
              <button onClick={() => alert('Signed out via Clerk')} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg">
                Sign Out
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <select
                value={profileData.role}
                onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-4 pt-2">
              <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-shadow shadow">
                <Check className="w-4 h-4" /> Save Changes
              </button>
              <button type="button" onClick={() => window.history.back()} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl bg-white hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
