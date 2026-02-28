import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import BookRide from "./pages/BookRide";
import DriverDashboard from "./pages/DriverDashboard";
import RideHistory from "./pages/RideHistory";
import RateDriver from './components/RateDriver'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing - only when signed OUT */}
        <Route
          path="/"
          element={
            <SignedOut>
              <Home />
            </SignedOut>
          }
        />
        {/* Protected routes - only when signed IN */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route
          path="/profile"
          element={
            <SignedIn>
              <Profile />
            </SignedIn>
          }
        />
        <Route
          path="/book-ride"
          element={
            <SignedIn>
              <BookRide />
            </SignedIn>
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            <SignedIn>
              <DriverDashboard />
            </SignedIn>
          }
        />
        <Route
          path="/history"
          element={
            <SignedIn>
              <RideHistory />
            </SignedIn>
          }
        />

        <Route
          path="/ratings"
          element={
            <SignedIn>
              <RateDriver />
            </SignedIn>
          }
        />
        {/* Auth redirects */}
        <Route path="/sign-in/*" element={<RedirectToSignIn />} />
        <Route path="/sign-up/*" element={<RedirectToSignIn />} />
        {/* Catch all - redirect to dashboard if signed in, home if not */}
        <Route
          path="*"
          element={
            (
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            ) || (
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            )
          }
        />
      </Routes>
    </Router>
  );
}
