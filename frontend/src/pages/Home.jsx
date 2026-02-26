import { SignInButton, SignUpButton } from '@clerk/clerk-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
          Welcome to JetRide
        </h1>
        <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Book rides instantly. Track drivers in real-time. Pay seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <SignUpButton 
            mode="modal"
            afterSignUpUrl="/dashboard"
            className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          />
          <SignInButton 
            mode="modal"
            afterSignInUrl="/dashboard"
            className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  )
}
    