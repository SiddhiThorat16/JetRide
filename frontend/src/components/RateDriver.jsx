import { useState } from 'react';
import { Star, Send } from 'lucide-react';

export default function RateDriver({ rideId, driverId, onClose }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');

  const submitRating = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ratings/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideId, driverId, score, comment })
      });
      
      if (response.ok) {
        alert('Rating submitted! Thank you!');
        onClose();
      }
    } catch (error) {
      alert('Failed to submit rating');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Your Driver</h2>
        
        <div className="flex gap-1 mb-6">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              onClick={() => setScore(star)}
              className={`text-3xl transition-all ${
                score >= star ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your ride (optional)"
          className="w-full p-4 border border-gray-300 rounded-xl resize-vertical min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
        />

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={submitRating}
            disabled={score === 0}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}
