import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "@/components/Auth";
import { useAuth } from "@/components/AuthProvider";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to home
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  useEffect(() => {
    // If user is already logged in, redirect to the page they were trying to access
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleAuthSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">JobApply.ai</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your job application dashboard
          </p>
        </div>
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Login;
