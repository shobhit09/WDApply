import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1),
        );
        const code = hashParams.get("code");

        if (!code) {
          throw new Error("No code found in URL");
        }

        // Exchange the code for a session
        await supabase.auth.exchangeCodeForSession(code);

        // Redirect to the home page
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error handling auth callback:", error);
        setError((error as Error).message);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">
            Authentication Error
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">
          Please wait while we log you in.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
