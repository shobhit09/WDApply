import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/home";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import routes from "tempo-routes";

// Lazy load components for better performance
const ProfileManager = lazy(() => import("./components/ProfileManager"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="p-6 max-w-4xl mx-auto">
                    <ProfileManager />
                  </div>
                </ProtectedRoute>
              }
            />
            {/* Add more protected routes as needed */}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
